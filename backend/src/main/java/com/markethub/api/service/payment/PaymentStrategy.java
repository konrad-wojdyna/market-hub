package com.markethub.api.service.payment;

public interface PaymentStrategy {

    PaymentResult processPayment(Long amount, String currency);
    String getProviderName();
}
