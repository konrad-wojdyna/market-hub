package com.markethub.api.dto.response;

import com.markethub.api.entity.PaymentStatus;

public record PaymentResponse(
        String providerPaymentId,
        String clientSecret,
        PaymentStatus status
) {}
