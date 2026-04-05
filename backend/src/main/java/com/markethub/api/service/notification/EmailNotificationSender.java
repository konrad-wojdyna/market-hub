package com.markethub.api.service.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;



@Service
public class EmailNotificationSender implements NotificationSender{

    private final static Logger logger = LoggerFactory.getLogger(EmailNotificationSender.class);

    @Override
    public void send(String recipient, String message) {
        logger.info("Sending message to email: , {} {}",  recipient, message);
    }

    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.EMAIL;
    }
}
