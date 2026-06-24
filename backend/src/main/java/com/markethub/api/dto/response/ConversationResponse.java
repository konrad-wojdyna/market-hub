package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record ConversationResponse(
        Long id,
        Long receiverId,
        String firstName,
        String avatar,
        String listingTitle,
        String lastMessageContent,
        LocalDateTime lastMessageAt
) {}
