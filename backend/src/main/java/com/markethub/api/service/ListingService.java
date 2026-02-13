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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    @Transactional
    public ListingResponse createListing(CreateListingRequest request){

        Listing listing = ListingMapper.toEntity(request);
        Listing newListing = listingRepository.save(listing);

        return ListingMapper.toResponse(newListing);
    }

    @Transactional(readOnly = true)
    public List<ListingResponse> getAllListing(){
        return listingRepository.findAll()
                .stream()
                .map(ListingMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ListingResponse getListingById(Long id){

        Listing listing = findListingById(id);
        return ListingMapper.toResponse(listing);
    }

    @Transactional
    public ListingResponse updateListing(Long id, UpdateListingRequest request){

        Listing listing = findListingById(id);

        Listing updatedListing = ListingMapper.updateListing(listing, request);
        Listing savedListing = listingRepository.save(updatedListing);

        return ListingMapper.toResponse(savedListing);
    }

    @Transactional
    public void deleteListing(Long id){
        if(!listingRepository.existsById(id)){
            throw new ListingNotFound(id);
        }

        listingRepository.deleteById(id);
    }

    private Listing findListingById(Long id){
        return listingRepository.findById(id)
                .orElseThrow(() -> new ListingNotFound(id));
    }
}
