package com.markethub.api.controller;

import com.markethub.api.dto.request.PaymentRequest;
import com.markethub.api.dto.response.FeaturedDurationsResponse;
import com.markethub.api.dto.response.PaymentResponse;
import com.markethub.api.entity.FeaturedDuration;
import com.markethub.api.security.userdetails.UserPrincipal;
import com.markethub.api.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> initPayment(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody PaymentRequest request) throws StripeException {
            PaymentResponse response = paymentService.createPayment(userPrincipal.id(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/options")
    public ResponseEntity<List<FeaturedDurationsResponse>> getFeaturedDurations(){

        List<FeaturedDurationsResponse> options = Arrays.stream(
                FeaturedDuration.values()
        ).map(f -> new FeaturedDurationsResponse(f.name(), f.getPrice(), f.getDuration()))
                .toList();

        return ResponseEntity.ok(options);
    }
}
