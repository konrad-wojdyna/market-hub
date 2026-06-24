package com.markethub.api.controller;


import com.markethub.api.dto.request.SendMessageRequest;
import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody SendMessageRequest request) {

        MessageResponse response = messageService.sendMessage(request, userPrincipal.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
