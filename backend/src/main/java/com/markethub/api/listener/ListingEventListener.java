package com.markethub.api.listener;


import com.markethub.api.entity.Listing;
import com.markethub.api.event.ListingCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
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
