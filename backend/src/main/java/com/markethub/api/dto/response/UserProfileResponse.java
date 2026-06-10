package com.markethub.api.dto.response;


import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String avatarUrl,
        String bio,
        String city,
        LocalDateTime joinedAt,
        LocalDateTime updatedAt
) {
}
