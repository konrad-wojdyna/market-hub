package com.markethub.api.dto.response;

public record FeaturedDurationsResponse(
        String name,
        Long price,
        Integer duration
) {
}
