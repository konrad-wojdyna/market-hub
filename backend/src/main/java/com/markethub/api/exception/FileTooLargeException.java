package com.markethub.api.exception;

public class FileTooLargeException extends RuntimeException {
    public FileTooLargeException(String message) {
        super(message);
    }

    public FileTooLargeException(){
        super("File size cannot exceed 5MB.");
    }
}
