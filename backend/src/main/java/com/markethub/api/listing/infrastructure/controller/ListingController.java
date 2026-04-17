package com.markethub.api.listing.infrastructure.controller;


import com.markethub.api.listing.infrastructure.controller.dto.request.CreateListingRequest;
import com.markethub.api.listing.application.ListingSearchParams;
import com.markethub.api.listing.infrastructure.controller.dto.request.UpdateListingRequest;
import com.markethub.api.listing.infrastructure.controller.dto.response.ListingResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.listing.application.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @GetMapping
    public ResponseEntity<Page<ListingResponse>> getAllListings(
            @Valid @ModelAttribute ListingSearchParams params,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable
            ){
        Page<ListingResponse> response = listingService.getAllListing(params, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable Long id){
        ListingResponse response = listingService.getListingById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ListingResponse> createListing(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody CreateListingRequest request){
        ListingResponse response = listingService.createListing(currentUser.id(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListingResponse> updateListing(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @Valid @RequestBody UpdateListingRequest request
            ){
        ListingResponse response = listingService.updateListing(id, request,  userPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id){
        listingService.deleteListing(id,  userPrincipal.id());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
