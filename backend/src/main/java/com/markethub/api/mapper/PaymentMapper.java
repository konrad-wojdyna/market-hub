package com.markethub.api.mapper;

import com.markethub.api.dto.request.PaymentRequest;
import com.markethub.api.dto.response.PaymentResponse;
import com.markethub.api.entity.Payment;
import com.markethub.api.entity.PaymentStatus;
import com.markethub.api.entity.User;
import com.markethub.api.listing.domain.Listing;

public class PaymentMapper {

    public static Payment toEntity(Listing listing, User user, Long amount, PaymentRequest request, String stripePaymentIntentId){
        return Payment.builder()
                .listing(listing)
                .user(user)
                .amount(amount)
                .currency(request.currency())
                .stripePaymentIntentId(stripePaymentIntentId)
                .status(PaymentStatus.PENDING)
                .build();
    }

    public static PaymentResponse toResponse(Payment payment, String clientSecret){
        return new PaymentResponse(
                payment.getStripePaymentIntentId(),
                clientSecret,
                payment.getStatus().name()
        );
    }

}
