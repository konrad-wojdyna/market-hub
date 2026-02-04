package com.markethub.api.mapper;

import com.markethub.api.dto.request.CreateListingRequest;
import com.markethub.api.dto.request.UpdateListingRequest;
import com.markethub.api.dto.response.ListingResponse;
import com.markethub.api.entity.Listing;

public class ListingMapper {

    public static ListingResponse toResponse(Listing listing){
        return new ListingResponse(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getPrice(),
                listing.getCategory(),
                listing.getLocation(),
                listing.getCreatedAt()
        );
    }

    public static Listing toEntity(CreateListingRequest request){
        return Listing.builder()
                .title(request.title())
                .description(request.description())
                .price(request.price())
                .category(request.category())
                .location(request.location())
                .build();
    }

    public static Listing updateListing(Listing listing, UpdateListingRequest request){

        listing.setTitle(request.title());
        listing.setDescription(request.description());
        listing.setPrice(request.price());
        listing.setCategory(request.category());
        listing.setLocation(request.location());

        return listing;
    }
}
