package com.markethub.api.exception;

public class ListingNotFound extends RuntimeException {
    public ListingNotFound(String message) {
        super(message);
    }

    public ListingNotFound(Long id){
        super("Listing not found with id: " + id);
    }
}
