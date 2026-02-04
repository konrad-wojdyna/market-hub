package com.markethub.api.service;

import com.markethub.api.dto.request.CreateListingRequest;
import com.markethub.api.dto.request.UpdateListingRequest;
import com.markethub.api.dto.response.ListingResponse;
import com.markethub.api.entity.Listing;
import com.markethub.api.exception.ListingNotFound;
import com.markethub.api.mapper.ListingMapper;
import com.markethub.api.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingResponse createListing(CreateListingRequest request){

        Listing listing = ListingMapper.toEntity(request);
        Listing newListing = listingRepository.save(listing);

        return ListingMapper.toResponse(newListing);
    }

    public List<ListingResponse> getAllListing(){
        return listingRepository.findAll()
                .stream()
                .map(ListingMapper::toResponse)
                .toList();
    }

    public ListingResponse getListingById(Long id){

        Listing listing = findListingById(id);
        return ListingMapper.toResponse(listing);
    }

    public ListingResponse updateListing(Long id, UpdateListingRequest request){

        Listing listing = findListingById(id);

        Listing updatedListing = ListingMapper.updateListing(listing, request);
        Listing savedListing = listingRepository.save(updatedListing);

        return ListingMapper.toResponse(savedListing);
    }

    public void deleteListing(Long id){
        listingRepository.deleteById(id);
    }

    private Listing findListingById(Long id){
        return listingRepository.findById(id)
                .orElseThrow(() -> new ListingNotFound(id));
    }
}
