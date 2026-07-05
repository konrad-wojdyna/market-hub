package com.markethub.api.service.payment;

import com.markethub.api.entity.PaymentStatus;

public record PaymentResult(
        String providerPaymentId,
        String clientSecret,
        PaymentStatus status
) {}
