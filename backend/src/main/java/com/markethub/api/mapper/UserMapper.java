package com.markethub.api.mapper;

import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.request.RegisterRequest;
import com.markethub.api.dto.request.UpdateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;
import com.markethub.api.entity.UserProfile;

public class UserMapper {

    public static User toEntity(RegisterRequest request, String hashedPassword) {
        return User.builder()
                .email(request.email())
                .password(hashedPassword)
                .firstName(request.firstName())
                .lastName(request.lastName())
                .phone(request.phone())
                .build();
    }

    public static UserResponse toResponse(User user){
          return new UserResponse(
                  user.getId(),
                  user.getEmail(),
                  user.getFirstName(),
                  user.getLastName(),
                  user.getPhone(),
                  user.getCreatedAt(),
                  user.getUpdatedAt()
          );
    }

    public static UserProfileResponse toProfileResponse(UserProfile userProfile){
        return new UserProfileResponse(
                userProfile.getId(),
                userProfile.getUser().getId(),
                userProfile.getUser().getFirstName(),
                userProfile.getUser().getLastName(),
                userProfile.getBio(),
                userProfile.getAvatar(),
                userProfile.getLocation(),
                userProfile.getUser().getCreatedAt()
        );
    }

    public static UserProfile updateProfile(UserProfile userProfile,
                                                    UpdateUserProfileRequest request){

        if(request.bio() != null){
            userProfile.setBio(request.bio());
        }

        if(request.avatar() != null){
            userProfile.setAvatar(request.avatar());
        }

        if(request.location() != null){
            userProfile.setLocation(request.location());
        }

        return userProfile;
    }

    public static UserProfile toProfileEntity(CreateUserProfileRequest request, User user){
        return UserProfile.builder()
                .user(user)
                .bio(request.bio())
                .avatar(request.avatar())
                .location(request.location())
                .build();
    }

}
