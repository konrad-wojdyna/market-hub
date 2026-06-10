package com.markethub.api.service;


import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.entity.User;
import com.markethub.api.entity.UserProfile;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.exception.UserProfileNotFound;
import com.markethub.api.mapper.UserProfileMapper;
import com.markethub.api.repository.UserProfileRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    public UserProfileResponse createOrUpdateUserProfile(
            Long currentUserId,
            CreateUserProfileRequest request
    ){

      UserProfile userProfile = userProfileRepository.findById(currentUserId)
              .map(existingProfile -> {
                  UserProfileMapper.updateUserProfile(existingProfile, request);
                  return existingProfile;
              })
              .orElseGet(() -> {
                  User user = userRepository.findById(currentUserId).orElseThrow(() -> new UserNotFoundException(currentUserId));
                  UserProfile newProfileEntity = UserProfileMapper.toEntity(request);
                  newProfileEntity.setUser(user);
                  return   newProfileEntity;
              });

      UserProfile savedEntity = userProfileRepository.save(userProfile);
      return UserProfileMapper.toResponse(savedEntity);
    }


    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfileById(Long profileId){

        UserProfile userProfile = findUserProfileById(profileId);

        return UserProfileMapper.toResponse(userProfile);
    }

    @Transactional
    public void deleteUserProfile(Long currentUserId){

       UserProfile userProfile = findUserProfileById(currentUserId);
       userProfileRepository.delete(userProfile);
    }

    private UserProfile findUserProfileById(Long profileId){
        return userProfileRepository.findById(profileId).orElseThrow(() -> new UserProfileNotFound(profileId));
    }
}
