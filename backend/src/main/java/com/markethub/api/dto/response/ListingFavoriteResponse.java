package com.markethub.api.dto.response;

import java.math.BigDecimal;

public record ListingFavoriteResponse(
        Long id,
        String title,
        BigDecimal price,
        String mainImage
) {}
