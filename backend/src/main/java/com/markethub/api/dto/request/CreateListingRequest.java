package com.markethub.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CreateListingRequest(

        @NotBlank(message = "Title is required")
        @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
        String title,

        String description,

        @Positive(message = "Price must be positive")
        BigDecimal price,

        @NotBlank(message = "Category is required")
        @Size(min = 3, max = 20, message = "Category must be between 3 and 20 characters")
        String category,

        String location
) {
}
