package com.markethub.api.service;


import com.markethub.api.dto.request.CreateConversationRequest;
import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.User;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.domain.ListingNotFound;
import com.markethub.api.listing.infrastructure.persistence.JpaListingRepository;
import com.markethub.api.mapper.ConversationMapper;
import com.markethub.api.repository.ConversationRepository;
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
    private final JpaListingRepository listingRepository;

    @Transactional
    public ConversationResponse getOrCreateConversation(Long currentUserId, CreateConversationRequest request){

         Conversation conversation = conversationRepository.findByListingAndUsers(request.listingId(), currentUserId, request.receiverId())
                 .orElseGet(() -> {

                     User user1 = userRepository.getReferenceById(currentUserId);
                     User user2 = userRepository.findById(request.receiverId()).orElseThrow(() -> new UserNotFoundException(request.receiverId()));
                     Listing listing = listingRepository.findById(request.listingId()).orElseThrow(() -> new ListingNotFound(request.listingId()));

                     Conversation newConversation = ConversationMapper.toEntity(user1, user2, listing);
                     return conversationRepository.save(newConversation);
                 });


         return ConversationMapper.toResponse(conversation, currentUserId);
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> getConversations(Long currentUserId){

        List<Conversation> conversations = conversationRepository.findAllByUserId(currentUserId);
        return conversations.stream().map(conv -> ConversationMapper.toResponse(conv, currentUserId)).toList();
    }
}
