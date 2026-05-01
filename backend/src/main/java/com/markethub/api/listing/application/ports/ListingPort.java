package com.markethub.api.listing.application.ports;

import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.application.ListingSearchParams;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ListingPort {

    Listing save(Listing listing);
    Page<Listing> findAll(ListingSearchParams params,
                                  Pageable pageable);
    Optional<Listing> findById(Long id);
    void deleteById(Long id);
}
