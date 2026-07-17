package com.markethub.api.mapper;

import com.markethub.api.dto.response.FavoriteResponse;
import com.markethub.api.dto.response.ListingFavoriteResponse;
import com.markethub.api.entity.Favorite;
import com.markethub.api.entity.ListingImage;
import com.markethub.api.entity.User;
import com.markethub.api.listing.domain.Listing;

public class FavoriteMapper {

    public static FavoriteResponse toResponse(Favorite favorite){

        String mainImage = favorite.getListing().getImages().stream()
                .filter(ListingImage::isMain)
                .map(ListingImage::getUrl)
                .findFirst()
                .orElse(null);

        ListingFavoriteResponse listingFavoriteResponse = new ListingFavoriteResponse(
                favorite.getListing().getId(),
                favorite.getListing().getTitle(),
                favorite.getListing().getPrice(),
                mainImage
        );

        return new FavoriteResponse(
                favorite.getId(),
                favorite.getCreatedAt(),
                listingFavoriteResponse
        );
    }

    public static Favorite toEntity(Listing listing, User currentUser){
        return Favorite.builder()
                .user(currentUser)
                .listing(listing)
                .build();
    }
}
