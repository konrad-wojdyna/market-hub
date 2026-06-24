package com.markethub.api.service;


import com.markethub.api.dto.request.SendMessageRequest;
import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.Message;
import com.markethub.api.entity.User;
import com.markethub.api.exception.ResourceNotFoundException;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.mapper.MessageMapper;
import com.markethub.api.repository.ConversationRepository;
import com.markethub.api.repository.MessageRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    @Transactional
    public MessageResponse sendMessage(
            SendMessageRequest request,
            Long currentUserId
    ){
        Conversation conversation = conversationRepository.findById(request.conversationId())
                .orElseThrow(() -> new ResourceNotFoundException("conversation", request.conversationId()));

        User currentUser = userRepository.getReferenceById(currentUserId);

        if(!(conversation.getSender().getId().equals(currentUser.getId())
                || conversation.getReceiver().getId().equals(currentUser.getId()))){
            throw new UnauthorizedAccessException();
        }

        Message newMessage = MessageMapper.toEntity(conversation, currentUser, request.content());
        Message savedMessage = messageRepository.save(newMessage);
        conversation.setLastMessageAt(LocalDateTime.now());

        return MessageMapper.toResponse(savedMessage);
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(
            Long conversationId
    ){
        List<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        return messages.stream().map(MessageMapper::toResponse).toList();
    }
}
