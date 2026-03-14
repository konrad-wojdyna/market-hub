package com.markethub.api.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super("You don't have permission to perform this action");
    }

    public UnauthorizedAccessException(Long userId){
        super("User with id " + userId + " don't have permission to perform this action");
    }
}
