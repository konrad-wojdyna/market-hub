package com.markethub.api.listing.application;

import com.markethub.api.listing.domain.Listing;

public record ListingCreatedEvent(
     Listing listing
) {}
