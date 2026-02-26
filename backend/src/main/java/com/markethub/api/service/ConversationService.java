package com.markethub.api.service;

import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.mapper.ConversationMapper;
import com.markethub.api.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    @Transactional
    public Conversation getOrCreateEntity(Long user1Id, Long user2Id, Long listingId) {
        return conversationRepository.findExistingConversation(
                listingId, user1Id, user2Id
        ).orElseGet(() -> conversationRepository.save(
                Conversation.builder()
                        .user1Id(user1Id)
                        .user2Id(user2Id)
                        .listingId(listingId)
                        .build()
        ));
    }

    @Transactional
    public ConversationResponse getOrCreateConversation(Long user1Id, Long user2Id, Long listingId){
     return ConversationMapper.toResponse(
             getOrCreateEntity(user1Id, user2Id, listingId)
     );
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> getConversations(Long userId){
        return conversationRepository.findConversationsByUserId(userId)
                .stream().map(ConversationMapper::toResponse).toList();
    }
}
