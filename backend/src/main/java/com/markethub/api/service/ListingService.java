package com.markethub.api.service;

import com.markethub.api.dto.request.CreateListingRequest;
import com.markethub.api.dto.request.ListingSearchParams;
import com.markethub.api.dto.request.UpdateListingRequest;
import com.markethub.api.dto.response.ListingResponse;
import com.markethub.api.entity.Category;
import com.markethub.api.entity.Listing;
import com.markethub.api.entity.User;
import com.markethub.api.event.ListingCreatedEvent;
import com.markethub.api.exception.CategoryNotFound;
import com.markethub.api.exception.ListingNotFound;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.mapper.ListingMapper;
import com.markethub.api.repository.CategoryRepository;
import com.markethub.api.repository.ListingRepository;
import com.markethub.api.repository.UserRepository;
import com.markethub.api.repository.specification.ListingSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class ListingService {

    private final ApplicationEventPublisher eventPublisher;

    private final ListingRepository listingRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public ListingResponse createListing(
            Long currentUserId,
            CreateListingRequest request){

        User user = userRepository.findById(currentUserId).orElseThrow(() ->
                new UserNotFoundException(currentUserId));

        Category category = categoryRepository.findById(request.categoryId()).orElseThrow(() ->
                new CategoryNotFound(request.categoryId()));

        Listing listing = ListingMapper.toEntity(request, user, category);
        Listing newListing = listingRepository.save(listing);

        eventPublisher.publishEvent(new ListingCreatedEvent(newListing));

        return ListingMapper.toResponse(newListing);
    }

    @Transactional(readOnly = true)
    public Page<ListingResponse> getAllListing(
            ListingSearchParams params,
            Pageable pageable
    ){
       Specification<Listing> spec = ListingSpecification
               .hasTitle(params.title())
                       .and(ListingSpecification.hasLocation(params.location()))
                               .and(ListingSpecification.hasPriceBetween(params.minPrice(), params.maxPrice()))
                                       .and(ListingSpecification.hasCategory(params.categoryId()));

       return listingRepository.findAll(spec, pageable)
               .map(ListingMapper::toResponse);
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

        Category category = categoryRepository.findById(request.categoryId()).orElseThrow(() ->
                new CategoryNotFound(request.categoryId()));

        Listing updatedListing =
                ListingMapper.updateListing(listing, request, category);
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
