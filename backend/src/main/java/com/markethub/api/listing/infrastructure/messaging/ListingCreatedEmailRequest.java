package com.markethub.api.listing.infrastructure.messaging;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ListingCreatedEmailRequest
        (
           Long listingId,
           String title,
           BigDecimal price,
           String category,
           String location,
           LocalDateTime createdAt,
           String userEmail,
           String userFirstName,
           String userLastName
        ) {}
