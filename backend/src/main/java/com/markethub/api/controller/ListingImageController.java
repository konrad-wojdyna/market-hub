package com.markethub.api.controller;


import com.markethub.api.dto.response.ListingImageResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.ListingImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listings")
@RequiredArgsConstructor
public class ListingImageController {

    private final ListingImageService listingImageService;

    @PostMapping("/{listingId}/images")
    public ResponseEntity<ListingImageResponse> uploadListingImage(
            @PathVariable Long listingId,
            @RequestParam MultipartFile file,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){

        ListingImageResponse response = listingImageService.uploadImage(listingId, file, userPrincipal.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{listingId}/images/{imageId}")
    public ResponseEntity<Void> deleteListingImage(
            @PathVariable Long listingId,
            @PathVariable Long imageId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        listingImageService.deleteImage(imageId, userPrincipal.id());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{listingId}/images")
    public ResponseEntity<List<ListingImageResponse>> getListingImage(
            @PathVariable Long listingId){
        List<ListingImageResponse> imagesResponse =
                listingImageService.getImages(listingId);
        return ResponseEntity.ok(imagesResponse);
    }
}
