package com.markethub.api.listing.infrastructure.persistence;

import com.markethub.api.listing.application.ListingSearchParams;
import com.markethub.api.listing.application.ports.ListingPort;
import com.markethub.api.listing.domain.Listing;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ListingAdapter implements ListingPort {

    private final JpaListingRepository jpaListingRepository;

    @Override
    public Listing save(Listing listing) {
        return jpaListingRepository.save(listing);
    }

    @Override
    public Page<Listing> findAll(ListingSearchParams params, Pageable pageable) {

        Specification<Listing> spec = ListingSpecification
                .hasTitle(params.title())
                .and(ListingSpecification.hasLocation(params.location()))
                .and(ListingSpecification.hasPriceBetween(params.minPrice(), params.maxPrice()))
                .and(ListingSpecification.hasCategory(params.categoryId()));

        return jpaListingRepository.findAll(spec, pageable);
    }

    @Override
    public Optional<Listing> findById(Long id) {
        return jpaListingRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
       jpaListingRepository.deleteById(id);
    }
}
