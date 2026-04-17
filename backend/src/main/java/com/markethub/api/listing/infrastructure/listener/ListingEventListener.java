package com.markethub.api.listing.infrastructure.listener;

import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.application.ListingCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class ListingEventListener {

    private static final Logger log = LoggerFactory.getLogger(ListingEventListener.class);

    @TransactionalEventListener
    public void onListingCreated(ListingCreatedEvent event){
        Listing listing = event.listing();

        log.info("Created listing {} {}", listing.getTitle(), listing.getCategory().getName());
    }
}
