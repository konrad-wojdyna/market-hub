package com.markethub.api.mapper;

import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.entity.UserProfile;

public class UserProfileMapper {

    public static UserProfileResponse toResponse(UserProfile userProfile){
        return new UserProfileResponse(
                userProfile.getId(),
                userProfile.getAvatarUrl(),
                userProfile.getBio(),
                userProfile.getCity(),
                userProfile.getUser().getCreatedAt(),
                userProfile.getUpdatedAt()
        );
    }

    public static UserProfile toEntity(CreateUserProfileRequest request){
        return UserProfile.builder()
                .avatarUrl(request.avatarUrl())
                .bio(request.bio())
                .city(request.city())
                .build();
    }

    public static void updateUserProfile(UserProfile profile, CreateUserProfileRequest request){

        if(request.bio() != null){
             profile.setBio(request.bio());
        }

        if(request.city() != null){
             profile.setCity(request.city());
        }

        if(request.avatarUrl() != null){
            profile.setAvatarUrl(request.avatarUrl());
        }
    }
}
