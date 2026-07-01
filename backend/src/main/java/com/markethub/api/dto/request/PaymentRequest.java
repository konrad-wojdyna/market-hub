package com.markethub.api.dto.request;

public record PaymentRequest(
        Long listingId,
        String duration,
        String currency
) {}
