package com.markethub.api.dto.response;

public record PaymentResponse(
        String stripePaymentIntentId,
        String clientSecret,
        String status
) {}
