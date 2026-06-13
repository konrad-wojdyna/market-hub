package com.markethub.api.dto.response;


import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String avatarUrl,
        String bio,
        String city,
        LocalDateTime joinedAt,
        LocalDateTime updatedAt
) {
}
