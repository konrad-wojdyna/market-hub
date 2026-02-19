package com.markethub.api.controller;


import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.request.UpdateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentInfo(
            @AuthenticationPrincipal UserPrincipal principal
            ){

        UserResponse response = userService.getCurrentUser(principal.id());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/profile")
    public ResponseEntity<UserProfileResponse> createUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateUserProfileRequest request
    ){
        UserProfileResponse response = userService.createUserProfile(userPrincipal.id(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable("id") Long userId){
        UserProfileResponse userProfileResponse = userService.getUserProfileById(userId);
        return ResponseEntity.ok(userProfileResponse);
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateUserProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateUserProfileRequest request){
        UserProfileResponse response = userService.updateUserProfile(principal.id(), request);
        return ResponseEntity.ok(response);
    }
}
