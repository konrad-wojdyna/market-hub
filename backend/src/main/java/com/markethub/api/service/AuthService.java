package com.markethub.api.service;

import com.markethub.api.dto.request.LoginRequest;
import com.markethub.api.dto.request.RegisterRequest;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;
import com.markethub.api.exception.EmailAlreadyExistsException;
import com.markethub.api.mapper.UserMapper;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public UserResponse register(RegisterRequest request){

        if(userRepository.existsByEmail(request.email())){
             throw new EmailAlreadyExistsException(request.email());
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        User user = UserMapper.toEntity(request, hashedPassword);
        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }


    @Transactional
    public UserResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.email()).orElseThrow(
                () -> new IllegalArgumentException("Invalid credentials!")
        );

        if(!user.getPassword().equals(request.password())){
             throw new IllegalArgumentException("Invalid credentials!");
        }

        return UserMapper.toResponse(user);
    }
}
