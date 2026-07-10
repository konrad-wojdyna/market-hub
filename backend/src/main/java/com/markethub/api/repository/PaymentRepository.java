package com.markethub.api.repository;

import com.markethub.api.entity.Payment;
import com.markethub.api.entity.User;
import com.markethub.api.listing.domain.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByProviderPaymentId(String providerPaymentId);
}
