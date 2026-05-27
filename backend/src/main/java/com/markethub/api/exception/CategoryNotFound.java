package com.markethub.api.exception;

public class CategoryNotFound extends ResourceNotFoundException {

    public CategoryNotFound(Long id) {
        super("Category", id);
    }
}
