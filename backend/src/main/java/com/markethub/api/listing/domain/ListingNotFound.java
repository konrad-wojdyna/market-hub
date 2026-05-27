package com.markethub.api.listing.domain;

import com.markethub.api.exception.ResourceNotFoundException;

public class ListingNotFound extends ResourceNotFoundException {

    public ListingNotFound(Long id) {
        super("Listing", id);
    }
}
