package com.markethub.api.service;


import com.markethub.api.dto.request.SendMessageRequest;
import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    @Transactional
    public MessageResponse sendMessage(
            SendMessageRequest request
    ){
        // 1. Znajdz conwersation dla conversationId z request
        // 2. Jeśli istnieje - a). stworz obiekt Message b). zapisz je do bazy danych
        // 3. Jeśli nie -  404 (konwersacja nie istnieje)
        // 4. Zwróć MessageResponse z danymi
    }

    @Transactional(readOnly = true)
    public MessageResponse getMessages(
            Long conversationId
    ){
        // 1. Sprawdź czy messages istnieją
        // 2. Jeśli tak - zwróć je
        // 3. Jeśli nie - zwróć pustą tablicę czy 404?
        // 4. Zwróć MessageResponse z danymi
    }

}
