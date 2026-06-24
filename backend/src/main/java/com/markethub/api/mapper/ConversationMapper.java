package com.markethub.api.mapper;

import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.User;
import com.markethub.api.listing.domain.Listing;

import java.time.LocalDateTime;

public class ConversationMapper {


    public static ConversationResponse toResponse(Conversation conversation, Long currentUserId){

        User otherUser = conversation.getSender().getId().equals(currentUserId)
        ? conversation.getReceiver()
        : conversation.getSender();

        String avatarUrl = otherUser.getUserProfile() != null
                ? otherUser.getUserProfile().getAvatarUrl() : null;

        return new ConversationResponse(
                conversation.getId(),
                otherUser.getId(),
                otherUser.getFirstName(),
                avatarUrl,
                conversation.getListing().getTitle(),
                conversation.getLastMessageAt()
        );
    }

    public static Conversation toEntity(User sender, User receiver, Listing listing){
        return Conversation.builder()
                .sender(sender)
                .receiver(receiver)
                .listing(listing)
                .lastMessageAt(LocalDateTime.now())
                .build();
    }
}
