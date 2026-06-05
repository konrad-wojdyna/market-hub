package com.markethub.api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.markethub.api.dto.response.ListingImageResponse;
import com.markethub.api.entity.ListingImage;
import com.markethub.api.exception.MaxImagesReachedException;
import com.markethub.api.exception.ResourceNotFoundException;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.listing.application.ports.ListingPort;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.domain.ListingNotFound;
import com.markethub.api.mapper.ListingImageMapper;
import com.markethub.api.repository.ListingImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ListingImageService {

    private final Cloudinary cloudinary;
    private final ListingImageRepository listingImageRepository;
    private final ListingPort listingPort;

    @Transactional
    public ListingImageResponse uploadImage(
            Long listingId,
            MultipartFile file,
            Long currentUserId
    ) {

        Listing listing = getListingByIdAndCheckPermission(listingId, currentUserId);

        if(listing.getImages().size() >= 5){
            throw new MaxImagesReachedException();
        }

        boolean isMain = listing.getImages().isEmpty();

        Map<?, ?> uploadResult;

        try {
          uploadResult =
               cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        }catch (IOException e) {
           throw new RuntimeException("Failed to upload image to Cloudinary", e);
        }

        String url = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

       ListingImage listingImage =
               ListingImage.builder()
                               .url(url)
                       .cloudinaryPublicId(publicId)
                       .isMain(isMain)
                       .listing(listing)
                       .build();

       ListingImage savedListingImage = listingImageRepository.save(listingImage);

      return ListingImageMapper.toResponse(savedListingImage);
    }


    @Transactional
    public void deleteImage(Long imageId, Long currentUserId) {

        ListingImage image = listingImageRepository.findById(imageId).orElseThrow(
                () -> new ResourceNotFoundException("Image", imageId)
        );

        if(!image.getListing().getUser().getId().equals(currentUserId)){
            throw new UnauthorizedAccessException();
        }

        try {
           listingImageRepository.deleteById(image.getId());
           cloudinary.uploader().destroy(image.getCloudinaryPublicId(), ObjectUtils.emptyMap());
        }catch (IOException e) {
            throw new RuntimeException("Failed to remove image", e);
        }
    }

    @Transactional(readOnly = true)
    public List<ListingImageResponse> getImages(Long listingId){

         return listingImageRepository.findByListingId(listingId)
                        .stream().map(ListingImageMapper::toResponse).toList();
    }

    private Listing getListingByIdAndCheckPermission(Long listingId,  Long currentUserId){

        Listing listing = listingPort.findById(listingId).orElseThrow(() ->
                new ListingNotFound(listingId));

        if(!listing.getUser().getId().equals(currentUserId)){
            throw new UnauthorizedAccessException();
        }

        return listing;
    }
}
