package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendMessageRequest(

        @NotNull(message = "Conversation id is required")
        Long conversationId,

        @NotBlank(message = "Content is required")
        String content
) {
}
