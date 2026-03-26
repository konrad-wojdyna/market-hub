package com.markethub.api.exception;

public class SlugAlreadyExistsException extends RuntimeException {
    public SlugAlreadyExistsException(String categorySlug) {
        super("Slug already exists: " + categorySlug);
    }
}
