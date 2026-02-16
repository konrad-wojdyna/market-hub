package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record LoginResponse(
       String token,
       String type,
       UserResponse user
) {
}
