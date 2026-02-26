package com.markethub.api.mapper;

import com.markethub.api.dto.response.ConversationResponse;
import com.markethub.api.entity.Conversation;

public class ConversationMapper {

    public static ConversationResponse toResponse(Conversation conversation){
        return new ConversationResponse(
                conversation.getId(),
                conversation.getUser1Id(),
                conversation.getUser2Id(),
                conversation.getListingId(),
                conversation.getLastMessageAt()
        );
    }
}
