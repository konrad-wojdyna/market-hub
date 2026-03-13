DELETE FROM messages;
DELETE FROM conversations;
DELETE FROM listings;

ALTER  TABLE listings
ADD COLUMN user_id BIGINT NOT NULL,
ADD COLUMN updated_at TIMESTAMP;

ALTER TABLE listings
ADD CONSTRAINT fk_listings_user
FOREIGN KEY (user_id) REFERENCES users(id);
