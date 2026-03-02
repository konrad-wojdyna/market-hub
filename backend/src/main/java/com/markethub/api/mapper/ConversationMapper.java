package com.markethub.api.mapper;

import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.User;

public class ConversationMapper {

    public static ConversationResponse toResponse(Conversation conversation,
                                                  Long currentUserId){

        User otherUser = conversation.getUser1().getId().equals(currentUserId)
                ? conversation.getUser2() : conversation.getUser1();

        return new ConversationResponse(
                conversation.getId(),
                conversation.getUser1().getId(),
                conversation.getUser2().getId(),
                otherUser.getFirstName(),
                otherUser.getLastName(),
                conversation.getListing().getId(),
                conversation.getListing().getTitle(),
                conversation.getLastMessageAt()
        );
    }
}
