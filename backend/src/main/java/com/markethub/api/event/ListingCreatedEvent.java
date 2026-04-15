package com.markethub.api.event;

import com.markethub.api.entity.Listing;

public record ListingCreatedEvent(
     Listing listing
) {}
