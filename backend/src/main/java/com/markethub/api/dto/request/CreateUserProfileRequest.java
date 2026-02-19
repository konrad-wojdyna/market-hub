package com.markethub.api.dto.request;

import jakarta.validation.constraints.Size;

public record CreateUserProfileRequest(
        @Size(max = 500, message = "Bio need to be max 500 characters")
        String bio,

        @Size(max = 100, message = "Avatar need to be max 100 characters")
        String avatar,

        String location
) {}
