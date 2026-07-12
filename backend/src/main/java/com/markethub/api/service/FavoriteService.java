package com.markethub.api.service;


import com.markethub.api.dto.response.FavoriteResponse;
import com.markethub.api.entity.Favorite;
import com.markethub.api.entity.User;
import com.markethub.api.listing.application.ports.ListingPort;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.domain.ListingNotFound;
import com.markethub.api.mapper.FavoriteMapper;
import com.markethub.api.repository.FavoriteRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ListingPort listingPort;
    private final UserRepository userRepository;

    @Transactional
    public FavoriteResponse addFavorite(Long listingId, Long currentUserId){

        Listing listing = listingPort.findById(listingId).orElseThrow(
                () -> new ListingNotFound(listingId)
        );

        Favorite favorite = favoriteRepository.findByUserIdAndListingId(currentUserId, listingId)
                .orElseGet(() -> {

                    User user = userRepository.getReferenceById(currentUserId);
                    Favorite newFavorite = FavoriteMapper.toEntity(listing, user);

                    return favoriteRepository.save(newFavorite);
                });

        return  FavoriteMapper.toResponse(favorite);
    }

    @Transactional
    public void removeFavorite(Long listingId, Long currentUserId){
        favoriteRepository.deleteByUserIdAndListingId(currentUserId, listingId);
    }

    public boolean isFavorite(Long listingId, Long currentUserId){
        return favoriteRepository.existsByUserIdAndListingId(currentUserId, listingId);
    }

    public List<FavoriteResponse> getFavorites(Long currentUserId){
        List<Favorite> favorites = favoriteRepository.findByUserId(currentUserId);
        return favorites.stream().map(FavoriteMapper::toResponse).toList();
    }
}
