package com.markethub.api.service.payment;


import com.markethub.api.dto.request.PaymentRequest;
import com.markethub.api.dto.response.PaymentResponse;
import com.markethub.api.entity.FeaturedDuration;
import com.markethub.api.entity.Payment;
import com.markethub.api.entity.User;
import com.markethub.api.exception.PaymentProcessingException;
import com.markethub.api.exception.UnauthorizedAccessException;
import com.markethub.api.exception.UserNotFoundException;
import com.markethub.api.listing.application.ports.ListingPort;
import com.markethub.api.listing.domain.Listing;
import com.markethub.api.listing.domain.ListingNotFound;
import com.markethub.api.mapper.PaymentMapper;
import com.markethub.api.repository.PaymentRepository;
import com.markethub.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ListingPort listingPort;
    private final Map<String, PaymentStrategy> paymentStrategies;

    public PaymentResponse createPayment(Long currentUserId, PaymentRequest request) {

         Listing listing = listingPort.findById(request.listingId())
                 .orElseThrow(() -> new ListingNotFound(request.listingId()));

         User user = userRepository.findById(currentUserId).orElseThrow(() ->
                 new UserNotFoundException(currentUserId));

         if(!listing.getUser().getId().equals(currentUserId)){
             throw new UnauthorizedAccessException();
         }

        FeaturedDuration featuredDuration = FeaturedDuration.valueOf(request.duration());


        PaymentStrategy strategy = paymentStrategies.get(request.paymentProvider());

        if(strategy == null){
            throw new PaymentProcessingException("Unsupported payment provider: " + request.paymentProvider(), null);
        }

        PaymentResult result = strategy.processPayment(featuredDuration.getPrice(), request.currency());

        Payment payment = PaymentMapper.toEntity(listing, user, featuredDuration.getPrice(), request, result);
        paymentRepository.save(payment);

        return PaymentMapper.toResponse(payment, result.clientSecret());
    }
}
