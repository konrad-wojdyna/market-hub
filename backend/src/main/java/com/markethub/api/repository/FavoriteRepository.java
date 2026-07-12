package com.markethub.api.repository;


import com.markethub.api.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {


    @Query("SELECT DISTINCT f FROM Favorite f JOIN FETCH f.listing l LEFT JOIN FETCH l.images WHERE f.user.id = :userId")
    List<Favorite> findByUserId(@Param("userId") Long userId);

    void deleteByUserIdAndListingId(Long userId, Long listingId);

    Optional<Favorite> findByUserIdAndListingId(Long userId, Long listingId);

    boolean existsByUserIdAndListingId(Long userId, Long listingId);
}
