package com.markethub.api.service.payment;

import com.markethub.api.entity.PaymentStatus;
import com.markethub.api.exception.PaymentProcessingException;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("stripe")
@RequiredArgsConstructor
public class StripeStrategy implements PaymentStrategy{

    private final StripeClient stripeClient;

    @Override
    public PaymentResult processPayment(Long amount, String currency) {

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency(currency.toLowerCase())
                    .build();

            PaymentIntent intent = stripeClient.v1().paymentIntents().create(params);
            return new PaymentResult(intent.getId(), intent.getClientSecret(), PaymentStatus.PENDING);
        }catch (StripeException e){
            throw new PaymentProcessingException("Stripe payment processing failed", e);
        }
    }

    @Override
    public String getProviderName() {
        return "stripe";
    }
}
