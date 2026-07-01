package com.markethub.api.entity;

import lombok.Getter;

@Getter
public enum FeaturedDuration {
    SEVEN_DAYS(5000L, 7),
    FOURTEEN_DAYS( 9000L, 14);

    private final Long price;
    private final Integer duration;

    FeaturedDuration(Long price, Integer duration){
         this.price = price;
         this.duration = duration;
    }
}
