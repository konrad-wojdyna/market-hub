package com.markethub.api.dto.response;

import java.time.LocalDateTime;

public record CategoryResponse(
         Long id,
         String name,
         String slug,
         String icon,
         Integer displayOrder,
         boolean active,
         LocalDateTime createdAt,
         LocalDateTime updatedAt
) {}
