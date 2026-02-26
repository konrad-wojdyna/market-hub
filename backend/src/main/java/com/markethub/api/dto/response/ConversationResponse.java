package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record ConversationResponse(
        Long id,
        Long user1Id,
        Long user2Id,
        Long listingId,
        LocalDateTime lastMessageAt
) {
}
