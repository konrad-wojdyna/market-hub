package com.markethub.api.listing.infrastructure.persistence;


import com.markethub.api.listing.domain.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaListingRepository extends JpaRepository<Listing, Long>, JpaSpecificationExecutor<Listing> {}
