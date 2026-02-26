package com.markethub.api.mapper;

import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.entity.Message;

public class MessageMapper {

    public static MessageResponse toResponse(Message message){
        return new MessageResponse(
                message.getId(),
                message.getConversation().getId(),
                message.getSenderId(),
                message.getContent(),
                message.isRead(),
                message.getCreatedAt()
        );
    }
}
