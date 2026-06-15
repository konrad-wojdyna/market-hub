


CREATE TABLE conversations(
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    listing_id BIGINT NOT NULL,
    last_message_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_conversations_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_conversations_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_conversations_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE INDEX idx_conversations_sender ON conversations(sender_id);
CREATE INDEX idx_conversations_receiver ON conversations(receiver_id);
CREATE INDEX idx_conversations_listing ON conversations(listing_id);