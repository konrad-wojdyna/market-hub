package com.markethub.api.listing.infrastructure.controller.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ListingResponse(
        Long id,
        String title,
        String description,
        BigDecimal price,
        Long categoryId,
        String category,
        String location,
        LocalDateTime createdAt,
        Long ownerId
) {}
