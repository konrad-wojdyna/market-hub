package com.markethub.api.service;


import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.mapper.UserMapper;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getCurrentUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return UserMapper.toResponse(user);
    }

}
