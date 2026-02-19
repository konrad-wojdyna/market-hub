package com.markethub.api.exception;

public class ListingNotFoundException extends RuntimeException {
    public ListingNotFoundException(String message) {
        super(message);
    }

    public ListingNotFoundException(Long id){
        super("Listing not found with id: " + id);
    }
}
