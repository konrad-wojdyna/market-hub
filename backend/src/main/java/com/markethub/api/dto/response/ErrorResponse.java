package com.markethub.api.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        int statusCode,
        String reasonPhrase,
        String message,
        String requestURI,
        LocalDateTime timestamp,
        Map<String, String> errors
) {

    public ErrorResponse(int statusCode, String reasonPhrase, String message, String requestURI){
        this(statusCode, reasonPhrase, message, requestURI, LocalDateTime.now(), null);
    }

    public ErrorResponse(int statusCode, String reasonPhrase, String message, String requestURI, Map<String, String> errors){
        this(statusCode, reasonPhrase, message, requestURI, LocalDateTime.now(), errors);
    }
}
