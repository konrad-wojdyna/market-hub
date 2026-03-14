package com.markethub.api.service;

import com.markethub.api.dto.request.CreateListingRequest;
import com.markethub.api.dto.request.UpdateListingRequest;
import com.markethub.api.dto.response.ListingResponse;
import com.markethub.api.entity.Listing;
import com.markethub.api.entity.User;
import com.markethub.api.exception.ListingNotFound;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.mapper.ListingMapper;
import com.markethub.api.repository.ListingRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    @Transactional
    public ListingResponse createListing(
            Long currentUserId,
            CreateListingRequest request){

        User user = userRepository.findById(currentUserId).orElseThrow(() ->
                new UserNotFoundException(currentUserId));

        Listing listing = ListingMapper.toEntity(request, user);
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
    public ListingResponse updateListing(Long listingId, UpdateListingRequest request,
                                         Long currentUserId){

       Listing listing = findListingById(listingId);

       checkPermissions(currentUserId, listing);

        Listing updatedListing =
                ListingMapper.updateListing(listing, request);
        Listing savedListing = listingRepository.save(updatedListing);

        return ListingMapper.toResponse(savedListing);
    }

    @Transactional
    public void deleteListing(Long listingId, Long currentUserId){

        Listing listing = findListingById(listingId);
        checkPermissions(currentUserId, listing);

        listingRepository.delete(listing);
    }

    private Listing findListingById(Long id){
        return listingRepository.findById(id)
                .orElseThrow(() -> new ListingNotFound(id));
    }

    private void checkPermissions(Long currentUserId, Listing listing){
        if(!listing.getUser().getId().equals(currentUserId)){
          throw new UnauthorizedAccessException();
        }
    }
}
