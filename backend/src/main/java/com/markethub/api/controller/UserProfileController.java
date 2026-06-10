package com.markethub.api.controller;


import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(
            @PathVariable Long id
    ){
         UserProfileResponse response = userProfileService.getUserProfileById(id);
         return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> createOrUpdateUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody CreateUserProfileRequest request
            ){
        UserProfileResponse response = userProfileService.createOrUpdateUserProfile(userPrincipal.id(), request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/profile")
    public ResponseEntity<Void> deleteUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        userProfileService.deleteUserProfile(userPrincipal.id());
        return ResponseEntity.noContent().build();
    }
}
