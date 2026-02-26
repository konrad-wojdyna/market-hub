package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendMessageRequest(

        @NotNull(message = "User2Id id is required")
        Long user2Id,

        @NotNull(message = "Listing id is required")
        Long listingId,

        @NotBlank(message = "Content cannot be empty")
        String content
) {}
