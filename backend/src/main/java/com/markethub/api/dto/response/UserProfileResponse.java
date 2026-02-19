package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        Long userId,
        String firstName,
        String lastName,
        String bio,
        String avatar,
        String location,
        LocalDateTime joinedDate
) { }
