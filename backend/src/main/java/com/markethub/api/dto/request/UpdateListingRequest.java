package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateListingRequest(
        @NotBlank(message = "Title is required")
        @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
        String title,

        String description,

        @Positive(message = "Price must be positive")
        BigDecimal price,

        @NotNull(message = "Category is required")
        Long categoryId,

        String location
) {
}
