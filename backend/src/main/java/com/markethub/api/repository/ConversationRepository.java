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
     WHERE c.listingId = :listingId
     AND (
         (c.user1Id = :uid1 AND c.user2Id = :uid2)
         OR
         (c.user1Id = :uid2 AND c.user2Id = :uid1)
         )
    """)
    Optional<Conversation> findExistingConversation(
            @Param("listingId") Long listingId,
            @Param("uid1") Long uid1,
            @Param("uid2") Long uid2
    );

    @Query("""
    SELECT c FROM Conversation c
        WHERE c.user1Id = :uid OR c.user2Id = :uid
    """)
    List<Conversation> findConversationsByUserId(
            @Param("uid") Long uid);
}
