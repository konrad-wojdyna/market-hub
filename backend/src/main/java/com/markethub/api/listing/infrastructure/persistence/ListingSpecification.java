package com.markethub.api.listing.infrastructure.persistence;

import com.markethub.api.listing.domain.Listing;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ListingSpecification {

    public static Specification<Listing> hasTitle(String title){
        return (root, query, cb) -> title == null ?
                cb.conjunction() : cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public  static Specification<Listing> hasPriceBetween(BigDecimal min, BigDecimal max){
        return (root, query, cb) -> {
            if(min == null && max == null) return  cb.conjunction();
            if(min != null && max != null) return cb.between(root.get("price"), min, max);
            if(min != null) return cb.greaterThanOrEqualTo(root.get("price"), min);
            return cb.lessThanOrEqualTo(root.get("price"), max);
        };
    }

    public static Specification<Listing> hasCategory(Long categoryId){
        return (root, query, cb) -> categoryId == null ?
                cb.conjunction() : cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Listing> hasLocation(String location){
        return (root, query, cb) -> (location == null ||
                location.isBlank()) ?
                cb.conjunction() : cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%");
    }

    public static Specification<Listing> hasOwnerId(Long ownerId){
        return (root, query, cb) -> ownerId == null ?
                cb.conjunction() : cb.equal(root.get("user").get("id"), ownerId);
    }

    public static Order featuredFirst(Root<Listing> root, CriteriaBuilder cb){
        Expression<Integer> featuredScore = cb.<Integer>selectCase()
                .when(cb.greaterThan(root.get("featuredUntil"), LocalDateTime.now()), 1)
                .otherwise(0);

        return cb.desc(featuredScore);
    }
}
