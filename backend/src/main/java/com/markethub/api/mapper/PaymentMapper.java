package com.markethub.api.mapper;

import com.markethub.api.dto.request.PaymentRequest;
import com.markethub.api.dto.response.PaymentResponse;
import com.markethub.api.entity.FeaturedDuration;
import com.markethub.api.entity.Payment;
import com.markethub.api.entity.User;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.service.payment.PaymentResult;

public class PaymentMapper {

    public static Payment toEntity(Listing listing, User user, Long amount, PaymentRequest request, PaymentResult result, FeaturedDuration featuredDuration) {
        return Payment.builder()
                .listing(listing)
                .user(user)
                .amount(amount)
                .currency(request.currency())
                .providerPaymentId(result.providerPaymentId())
                .status(result.status())
                .featuredDuration(featuredDuration)
                .build();
    }

    public static PaymentResponse toResponse(Payment payment, String clientSecret){
        return new PaymentResponse(
                payment.getProviderPaymentId(),
                clientSecret,
                payment.getStatus()
        );
    }

}
