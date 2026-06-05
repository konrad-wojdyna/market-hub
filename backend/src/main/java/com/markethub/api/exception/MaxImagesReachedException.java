package com.markethub.api.exception;

public class MaxImagesReachedException extends RuntimeException {

    public MaxImagesReachedException(String message) {
        super(message);
    }

    public MaxImagesReachedException() {
        super("The maximum number of images is 5.");
    }
}
