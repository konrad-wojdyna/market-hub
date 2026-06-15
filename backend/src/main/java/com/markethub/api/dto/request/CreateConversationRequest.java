package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateConversationRequest(

        @NotNull(message = "Receiver id is required")
        Long receiverId,

        @NotNull(message = "Listing id is required")
        Long listingId
) {}
