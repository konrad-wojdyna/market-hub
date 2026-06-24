package com.markethub.api.controller;


import com.markethub.api.dto.request.CreateConversationRequest;
import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.ConversationService;
import com.markethub.api.service.MessageService;
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
    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<ConversationResponse> createOrCreateConversation(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody CreateConversationRequest createConversationRequest
    ){
        ConversationResponse response = conversationService.getOrCreateConversation(userPrincipal.id(), createConversationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getAllConversations(
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ) {
        List<ConversationResponse> conversations = conversationService.getConversations(userPrincipal.id());
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<MessageResponse>> getAllMessages(
            @PathVariable Long id
    ) {
        List<MessageResponse> messages = messageService.getMessages(id);
        return ResponseEntity.ok(messages);
    }
}
