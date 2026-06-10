package com.markethub.api.dto.request;

import jakarta.validation.constraints.Size;

public record CreateUserProfileRequest(

        @Size(max = 512, message = "City must be 512 characters max")
        String avatarUrl,

        String bio,


        @Size(max = 100, message = "City must be 100 characters max")
        String city

) {}
