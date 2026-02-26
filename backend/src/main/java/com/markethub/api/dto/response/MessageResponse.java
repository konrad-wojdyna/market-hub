package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record MessageResponse(
        Long id,
        Long conversationId,
        Long senderId,
        String content,
        boolean isRead,
        LocalDateTime createdAt
) {}
