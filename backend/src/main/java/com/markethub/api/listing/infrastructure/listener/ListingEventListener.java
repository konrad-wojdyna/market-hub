package com.markethub.api.listing.infrastructure.listener;

import com.markethub.api.config.RabbitMQConfig;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.application.ListingCreatedEvent;
import com.markethub.api.listing.infrastructure.messaging.ListingCreatedEmailRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ListingEventListener {

    private final RabbitTemplate rabbitTemplate;
    private static final Logger log = LoggerFactory.getLogger(ListingEventListener.class);

    @TransactionalEventListener
    public void onListingCreated(ListingCreatedEvent event){

        Listing listing = event.listing();

        ListingCreatedEmailRequest request = new ListingCreatedEmailRequest(
                listing.getId(),
                listing.getTitle(),
                listing.getPrice(),
                listing.getCategory().getName(),
                listing.getLocation(),
                listing.getCreatedAt(),
                listing.getUser().getEmail(),
                listing.getUser().getFirstName(),
                listing.getUser().getLastName()
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.LISTING_CREATED_QUEUE, request);

        log.info("Created listing {} {}", request.title(), request.category());
    }
}
