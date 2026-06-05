package com.markethub.api.exception;

public class InvalidFileTypeException extends RuntimeException {
    public InvalidFileTypeException(String message) {
        super(message);
    }

    public InvalidFileTypeException(){
        super("Only image files are allowed");
    }
}
