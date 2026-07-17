package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long id,
        LocalDateTime createdAt,
        ListingFavoriteResponse listingFavorite
) {}
