package com.markethub.api.controller;


import com.markethub.api.dto.request.SendMessageRequest;
import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody SendMessageRequest request){
        MessageResponse response = messageService.sendMessage(
                userPrincipal.id(), request.user2Id(), request.listingId(),
                request.content());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<MessageResponse>> getMessages(
            @PathVariable Long conversationId
    ){
        List<MessageResponse> response = messageService.getMessages(conversationId);
        return ResponseEntity.ok(response);
    }
}
