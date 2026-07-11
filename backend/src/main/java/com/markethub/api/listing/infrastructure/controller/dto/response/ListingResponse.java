package com.markethub.api.listing.infrastructure.controller.dto.response;

import com.markethub.api.dto.response.ListingImageResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ListingResponse(
        Long id,
        String title,
        String description,
        BigDecimal price,
        Long categoryId,
        String category,
        String location,
        LocalDateTime createdAt,
        Long ownerId,
        List<ListingImageResponse> images,
        boolean isFeatured
) {}
