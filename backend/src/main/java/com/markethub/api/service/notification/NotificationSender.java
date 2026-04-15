package com.markethub.api.service.notification;

public interface NotificationSender {

    void send(String recipient, String message);
    boolean supports(NotificationType type);
}
