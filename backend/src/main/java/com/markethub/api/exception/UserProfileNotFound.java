package com.markethub.api.exception;

public class UserProfileNotFound extends ResourceNotFoundException {
      public UserProfileNotFound(Long id){
          super("User Profile", id);
      }
}

