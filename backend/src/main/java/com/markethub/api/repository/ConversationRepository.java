package com.markethub.api.repository;

import com.markethub.api.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {


     @Query("SELECT c FROM Conversation c WHERE c.sender.id = :userId" +
             " OR c.receiver.id = :userId ORDER BY c.lastMessageAt DESC")
     List<Conversation> findAllByUserId(@Param("userId") Long userId);


     @Query("SELECT c FROM Conversation c WHERE c.listing.id = :listingId AND ((c.sender.id = :userId1 AND c.receiver.id = :userId2) " +
             "OR (c.sender.id = :userId2 " +
             "AND c.receiver.id = :userId1))" )
     Optional<Conversation> findByListingAndUsers(@Param("listingId") Long listingId, @Param("userId1") Long userId1, @Param("userId2") Long userId2);
}
