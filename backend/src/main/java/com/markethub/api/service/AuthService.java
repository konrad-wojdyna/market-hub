package com.markethub.api.service;

import com.markethub.api.dto.request.LoginRequest;
import com.markethub.api.dto.request.RegisterRequest;
import com.markethub.api.dto.response.LoginResponse;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;
import com.markethub.api.exception.EmailAlreadyExistsException;
import com.markethub.api.exception.InvalidCredentialsException;
import com.markethub.api.mapper.UserMapper;
import com.markethub.api.repository.UserRepository;
import com.markethub.api.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


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


    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.email()).orElseThrow(
                InvalidCredentialsException::new
        );

        if(!passwordEncoder.matches(request.password(), user.getPassword())){
            throw new InvalidCredentialsException();
        }

       String token = jwtUtils.generateToken(user.getId(), user.getEmail(), "USER");

        UserResponse userResponse = UserMapper.toResponse(user);
        return new LoginResponse(token, "Bearer", userResponse);
    }
}
