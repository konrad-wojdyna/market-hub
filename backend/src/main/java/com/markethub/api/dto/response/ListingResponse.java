package com.markethub.api.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ListingResponse(
        Long id,
        String title,
        String description,
        BigDecimal price,
        String category,
        String location,
        LocalDateTime createdAt
) {}
