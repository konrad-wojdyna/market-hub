package com.markethub.api.service.notification;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PushNotificationSender implements NotificationSender{

    private static final Logger logger = LoggerFactory.getLogger(PushNotificationSender.class);

    @Override
    public void send(String recipient, String message) {
        logger.info("Sending push notification: {} {}", recipient, message);
    }

    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.PUSH;
    }
}
