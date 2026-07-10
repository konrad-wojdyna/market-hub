package com.markethub.api.controller;


import com.markethub.api.service.payment.PaymentWebhookService;
import com.stripe.StripeClient;
import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/webhooks")
@RequiredArgsConstructor
@Slf4j
public class StripeWebhookController {

    private final StripeClient stripeClient;
    private final PaymentWebhookService paymentWebhookService;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @PostMapping("/stripe")
    public ResponseEntity<Void> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    )  {

        Event event;

        try{
           event = stripeClient.constructEvent(payload, sigHeader, webhookSecret);
        }catch (SignatureVerificationException e){
            log.warn("Nieprawidłowy podpis webhooka Stripe: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();

        switch (event.getType()){
            case "payment_intent.succeeded" -> {
                PaymentIntent intent;
                if(deserializer.getObject().isPresent()){
                    intent = (PaymentIntent) deserializer.getObject().get();
                }else {

                    try{
                    log.warn("Niezgodność wersji API przy deserializacji {} - używam deserializeUnsafe()", event.getId());
                    intent = (PaymentIntent) deserializer.deserializeUnsafe();
                    }catch (EventDataObjectDeserializationException e){
                        log.error("Nie udało się zdeserializować zdarzenia {} nawet w trybie unsafe: {}", event.getId(), e.getMessage());
                        return ResponseEntity.status(422).build();
                    }
                }
                    paymentWebhookService.handlePaymentSucceeded(intent);
            }

            default -> log.debug("Zignorowano nieobsługiwany typ zdarzenia: {}", event.getType());
        }

        return ResponseEntity.ok().build();
    }
}
