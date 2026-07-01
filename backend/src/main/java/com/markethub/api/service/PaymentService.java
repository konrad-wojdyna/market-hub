package com.markethub.api.service;


import com.markethub.api.config.StripeConfig;
import com.markethub.api.dto.request.PaymentRequest;
import com.markethub.api.dto.response.PaymentResponse;
import com.markethub.api.entity.FeaturedDuration;
import com.markethub.api.entity.Payment;
import com.markethub.api.entity.User;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.listing.application.ports.ListingPort;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.domain.ListingNotFound;
import com.markethub.api.mapper.PaymentMapper;
import com.markethub.api.repository.PaymentRepository;
import com.markethub.api.repository.UserRepository;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ListingPort listingPort;
    private final StripeClient stripeClient;

    public PaymentResponse createPayment(Long currentUserId, PaymentRequest request) throws StripeException {

         Listing listing = listingPort.findById(request.listingId())
                 .orElseThrow(() -> new ListingNotFound(request.listingId()));

         User user = userRepository.findById(currentUserId).orElseThrow(() ->
                 new UserNotFoundException(currentUserId));

         if(!listing.getUser().getId().equals(currentUserId)){
             throw new UnauthorizedAccessException();
         }

        FeaturedDuration featuredDuration = FeaturedDuration.valueOf(request.duration());

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(featuredDuration.getPrice())
                .setCurrency(request.currency().toLowerCase())
                .build();

        PaymentIntent intent = this.stripeClient.v1().paymentIntents().create(params);

        Payment payment = PaymentMapper.toEntity(listing, user, featuredDuration.getPrice(), request, intent.getId());
        paymentRepository.save(payment);

        return PaymentMapper.toResponse(payment, intent.getClientSecret());
    }

}
