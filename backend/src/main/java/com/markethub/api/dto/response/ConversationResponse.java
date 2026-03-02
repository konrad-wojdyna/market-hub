package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record ConversationResponse(
        Long id,
        Long user1Id,
        Long user2Id,
        String otherUserFirstName,
        String otherUserLastName,
        Long listingId,
        String listingTitle,
        LocalDateTime lastMessageAt
) {}
