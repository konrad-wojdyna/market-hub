


CREATE TABLE payments(
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT NOT NULL REFERENCES listings(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    amount BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    stripe_payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);


ALTER TABLE listings
ADD COLUMN featured_until TIMESTAMP;
