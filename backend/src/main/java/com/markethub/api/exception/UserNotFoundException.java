package com.markethub.api.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(Long userId){
        super("User with id " + userId + " not found");
    }
}
