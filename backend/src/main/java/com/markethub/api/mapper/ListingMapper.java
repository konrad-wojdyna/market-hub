package com.markethub.api.mapper;

import com.markethub.api.dto.request.CreateListingRequest;
import com.markethub.api.dto.request.UpdateListingRequest;
import com.markethub.api.dto.response.ListingResponse;
import com.markethub.api.entity.Category;
import com.markethub.api.entity.Listing;
import com.markethub.api.entity.User;

public class ListingMapper {

    public static ListingResponse toResponse(Listing listing){
        return new ListingResponse(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getPrice(),
                listing.getCategory().getName(),
                listing.getLocation(),
                listing.getCreatedAt(),
                listing.getUser().getId()
        );
    }

    public static Listing toEntity(CreateListingRequest request, User currentUser, Category category){
        return Listing.builder()

                .title(request.title())
                .description(request.description())
                .price(request.price())
                .category(category)
                .location(request.location())
                .user(currentUser)
                .build();
    }

    public static Listing updateListing(
            Listing listing,
            UpdateListingRequest request,
            Category category){

        listing.setTitle(request.title());
        listing.setDescription(request.description());
        listing.setPrice(request.price());
        listing.setCategory(category);
        listing.setLocation(request.location());

        return listing;
    }
}
