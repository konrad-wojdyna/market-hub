package com.markethub.api.service.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final List<NotificationSender> senders;

    public void sendNotification(NotificationType type, String recipient, String message){
        NotificationSender sender = senders
                .stream()
                .filter(s -> s.supports(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No notification sender found for " + type));

        sender.send(recipient, message);
    }
}
