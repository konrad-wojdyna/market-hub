package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateConversationRequest(
        @NotNull(message = "User id is required")
        Long user2Id,

        @NotNull(message = "Listing id is required")
        Long listingId
) {
}
