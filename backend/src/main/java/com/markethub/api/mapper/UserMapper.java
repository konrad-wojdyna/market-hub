package com.markethub.api.mapper;

import com.markethub.api.dto.request.RegisterRequest;
import com.markethub.api.dto.response.LoginResponse;
import com.markethub.api.dto.response.UserResponse;
import com.markethub.api.entity.User;

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
}
