package com.markethub.api.mapper;

import com.markethub.api.dto.response.ListingImageResponse;
import com.markethub.api.entity.ListingImage;

public class ListingImageMapper {

    public static ListingImageResponse toResponse(ListingImage listingImage) {
        return new ListingImageResponse(
                listingImage.getId(),
                listingImage.getUrl(),
                listingImage.isMain(),
                listingImage.getSortOrder()
        );
    }
}
