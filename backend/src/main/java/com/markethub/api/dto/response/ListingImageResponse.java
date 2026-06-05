package com.markethub.api.dto.response;

public record ListingImageResponse(
        Long id,
        String url,
        boolean isMain,
        int sortOrder
) {
}
