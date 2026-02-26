package com.markethub.api.controller;

import com.markethub.api.dto.request.CreateConversationRequest;
import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.ConversationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @PostMapping
    public ResponseEntity<ConversationResponse> getOrCreateConversation(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateConversationRequest request
            ){

        ConversationResponse response = conversationService.getOrCreateConversation(userPrincipal.id(),
                request.user2Id(), request.listingId());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getUserConversations(
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        List<ConversationResponse> responses = conversationService.getConversations(userPrincipal.id());
        return ResponseEntity.ok(responses);
    }

}
