package com.markethub.api.service;

import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.Listing;
import com.markethub.api.entity.User;
import com.markethub.api.exception.ListingNotFoundException;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.mapper.ConversationMapper;
import com.markethub.api.repository.ConversationRepository;
import com.markethub.api.repository.ListingRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    @Transactional
    public Conversation getOrCreateEntity(Long user1Id, Long user2Id, Long listingId) {

        return conversationRepository.findExistingConversation(
                listingId, user1Id, user2Id
        ).orElseGet(() -> {
            User user1 = userRepository.findById(user1Id).orElseThrow(() -> new UserNotFoundException(user1Id));
            User user2 = userRepository.findById(user2Id).orElseThrow(() -> new UserNotFoundException(user2Id));
            Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new ListingNotFoundException(listingId));

            return conversationRepository.save(
                    Conversation.builder()
                            .user1(user1)
                            .user2(user2)
                            .listing(listing)
                            .build()
            );
        });
    }

    @Transactional
    public ConversationResponse getOrCreateConversation(Long currentUserId, Long user2Id, Long listingId){
        Conversation conversation = getOrCreateEntity(currentUserId, user2Id, listingId);
     return ConversationMapper.toResponse(conversation, currentUserId);
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> getConversations(Long userId){
        return conversationRepository.findConversationsByUserId(userId)
                .stream().map((c) -> ConversationMapper.toResponse(c, userId)).toList();
    }
}
