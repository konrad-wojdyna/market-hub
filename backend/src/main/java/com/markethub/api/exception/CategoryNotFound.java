package com.markethub.api.exception;

public class CategoryNotFound extends RuntimeException {
    public CategoryNotFound(String message) {
        super(message);
    }

    public CategoryNotFound(Long id){
        super("Category not found with id: " + id);
    }
}
