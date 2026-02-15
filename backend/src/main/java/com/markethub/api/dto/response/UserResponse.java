package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String phone,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
