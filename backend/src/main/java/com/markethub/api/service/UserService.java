package com.markethub.api.service;


import com.markethub.api.dto.request.CreateUserProfileRequest;
import com.markethub.api.dto.request.UpdateUserProfileRequest;
import com.markethub.api.dto.response.UserProfileResponse;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;
import com.markethub.api.entity.UserProfile;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.exception.UserProfileAlreadyExistsException;
import com.markethub.api.exception.UserProfileNotFoundException;
import com.markethub.api.mapper.UserMapper;
import com.markethub.api.repository.UserProfileRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Long userId){
        User user = findUser(userId);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserProfileResponse createUserProfile(Long userId, CreateUserProfileRequest request){
        User user = findUser(userId);

        if(userProfileRepository.findByUserId(userId).isPresent()){
            throw new UserProfileAlreadyExistsException(userId);
        }

        UserProfile userProfile = UserMapper.toProfileEntity(request, user);
        UserProfile savedProfile = userProfileRepository.save(userProfile);

        return UserMapper.toProfileResponse(savedProfile);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfileById(Long userId){

       UserProfile userProfile = findUserProfile(userId);
       return UserMapper.toProfileResponse(userProfile);
    }

    @Transactional
    public UserProfileResponse updateUserProfile(Long userId, UpdateUserProfileRequest request){
        UserProfile userProfile = findUserProfile(userId);

        UserProfile updateProfile = UserMapper.updateProfile(userProfile, request);

        UserProfile savedProfile = userProfileRepository.save(updateProfile);

        return UserMapper.toProfileResponse(savedProfile);
    }

    private User findUser(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    private UserProfile findUserProfile(Long userId){
        return  userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new UserProfileNotFoundException(userId));
    }

}
