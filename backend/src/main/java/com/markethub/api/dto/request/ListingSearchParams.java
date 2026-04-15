package com.markethub.api.dto.request;

import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record ListingSearchParams(
        String title,
        @PositiveOrZero BigDecimal minPrice,
        @PositiveOrZero BigDecimal maxPrice,
        Long categoryId,
        String location
) {}
