package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateCategoryRequest(
        @NotBlank(message = "Category name is required")
        @Size(min = 3, max = 200, message = "Category name must be between 3 and 200 characters")
        String name,

        @NotBlank(message = "Category slug is required")
        @Size(min = 3, max = 200, message = "Category slug must be between 3 and 200 characters")
        String slug,

        String icon,

        Integer displayOrder,

        boolean active
) {
}
