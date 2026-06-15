package com.markethub.api.mapper;

import com.markethub.api.dto.response.MessageResponse;
import com.markethub.api.entity.Conversation;
import com.markethub.api.entity.Message;
import com.markethub.api.entity.User;

public class MessageMapper {


    public static MessageResponse toResponse(Message message){

        String avatarUrl = message.getSender().getUserProfile() != null
                ? message.getSender().getUserProfile().getAvatarUrl() : null;

        return new MessageResponse(
                message.getId(),
                message.getConversation().getId(),
                message.getSender().getId(),
                message.getSender().getFirstName(),
                avatarUrl,
                message.getContent(),
                message.isRead(),
                message.getCreatedAt()
        );
    }

    public static Message toEntity(Conversation conversation, User sender, String content){
        return Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(content)
                .isRead(false)
                .build();
    }
}
