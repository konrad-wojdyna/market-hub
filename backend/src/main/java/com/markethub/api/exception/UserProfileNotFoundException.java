package com.markethub.api.exception;

public class UserProfileNotFoundException extends RuntimeException {
    public UserProfileNotFoundException(String message) {
        super(message);
    }

    public UserProfileNotFoundException(Long id){
        super("User profile with id " + id + " not found");
    }
}
