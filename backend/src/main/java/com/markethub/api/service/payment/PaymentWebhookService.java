package com.markethub.api.service.payment;


import com.markethub.api.entity.Payment;
import com.markethub.api.entity.PaymentStatus;
import com.markethub.api.repository.PaymentRepository;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentWebhookService {

    private final PaymentRepository paymentRepository;

    @Transactional
    public void handlePaymentSucceeded(PaymentIntent intent){

        Optional<Payment> paymentOpt =
                paymentRepository.findByProviderPaymentId(intent.getId());

        if(paymentOpt.isEmpty()){
            log.warn("Otrzymano webhook dla nieznanego PaymentIntent: {}", intent.getId());
            return;
        }

        Payment payment = paymentOpt.get();

        if(payment.getStatus() == PaymentStatus.SUCCEEDED){
            log.info("Płatność {} już przetworzona, pomijam", payment.getId());
            return;
        }

        payment.setStatus(PaymentStatus.SUCCEEDED);

        int days = payment.getFeaturedDuration().getDuration();
        payment.getListing().setFeaturedUntil(LocalDateTime.now().plusDays(days));

        paymentRepository.save(payment);

        log.info("Płatność {} zakończona sukcesem, listing {} wyróżniony do {}",
                payment.getId(), payment.getListing().getId(), payment.getListing().getFeaturedUntil());

    }

}
