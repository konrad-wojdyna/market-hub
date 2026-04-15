package com.markethub.api.repository.specification;

import com.markethub.api.entity.Listing;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

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
}
