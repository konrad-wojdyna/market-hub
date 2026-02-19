package com.markethub.api.exception;

public class UserProfileAlreadyExistsException extends RuntimeException {
    public UserProfileAlreadyExistsException(String message) {
        super(message);
    }

    public UserProfileAlreadyExistsException(Long userId) {
        super("User profile already exists with id " + userId);
    }
}
