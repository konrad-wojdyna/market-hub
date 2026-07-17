package com.markethub.api.controller;


import com.markethub.api.dto.request.AddFavoriteRequest;
import com.markethub.api.dto.response.FavoriteResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService  favoriteService;

    @GetMapping
    public ResponseEntity<List<FavoriteResponse>> getFavorites(
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        List<FavoriteResponse> favorites = favoriteService.getFavorites(userPrincipal.id());
        return ResponseEntity.ok(favorites);
    }

    @PostMapping
    public ResponseEntity<FavoriteResponse> addFavorite(
            @RequestBody AddFavoriteRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        FavoriteResponse favoriteResponse = favoriteService.addFavorite(request.listingId(), userPrincipal.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteResponse);
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteFavorite(
            @PathVariable Long listingId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        favoriteService.removeFavorite(listingId, userPrincipal.id());
        return ResponseEntity.noContent().build();
    }
}
