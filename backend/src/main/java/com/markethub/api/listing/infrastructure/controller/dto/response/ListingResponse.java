package com.markethub.api.listing.infrastructure.controller.dto.response;

import com.markethub.api.dto.response.ListingImageResponse;
import com.markethub.api.entity.ListingImage;

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
        List<ListingImage> images
) {}
