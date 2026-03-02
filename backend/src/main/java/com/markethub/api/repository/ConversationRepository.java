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

    @Query("""
     SELECT c FROM Conversation c
     JOIN FETCH c.user1
     JOIN FETCH c.user2
     JOIN FETCH c.listing
     WHERE c.listing.id = :listingId
     AND (
         (c.user1.id = :uid1 AND c.user2.id = :uid2)
         OR
         (c.user1.id = :uid2 AND c.user2.id = :uid1)
         )
    """)
    Optional<Conversation> findExistingConversation(
            @Param("listingId") Long listingId,
            @Param("uid1") Long uid1,
            @Param("uid2") Long uid2
    );

    @Query("""
    SELECT c FROM Conversation c
    JOIN FETCH c.user1
    JOIN FETCH c.user2
    JOIN FETCH c.listing
    WHERE c.user1.id = :userId OR c.user2.id = :userId
    """)
    List<Conversation> findConversationsByUserId(
            @Param("userId") Long userId);
}
