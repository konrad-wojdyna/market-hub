package com.markethub.api.dto.response;

public record LoginResponse(
       String token,
       String type,
       UserResponse user
) {}
