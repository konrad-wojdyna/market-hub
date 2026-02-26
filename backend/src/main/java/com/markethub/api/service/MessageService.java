package com.markethub.api.service;

import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.Message;
import com.markethub.api.mapper.MessageMapper;
import com.markethub.api.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Transactional
    public MessageResponse sendMessage(Long senderId, Long user2Id, Long listingId,
                             String content){

        Conversation conversation = conversationService.getOrCreateEntity(senderId, user2Id, listingId);
        conversation.setLastMessageAt(LocalDateTime.now());

        Message message = Message.builder()
                .conversation(conversation)
                .senderId(senderId)
                .content(content)
                .isRead(false)
                .build();

        Message savedMessage = messageRepository.save(message);
        MessageResponse response = MessageMapper.toResponse(savedMessage);

        simpMessagingTemplate.convertAndSend(
                "/topic/conversations/" + conversation.getId(),
                response
        );

        return response;
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(Long conversationId){
        return messageRepository.findAllByConversation_IdOrderByCreatedAtAsc(conversationId)
                .stream().map(MessageMapper::toResponse).toList();
    }
}
