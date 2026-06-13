

ALTER TABLE listings
DROP CONSTRAINT fk_listings_user;

ALTER TABLE listings
ADD CONSTRAINT fk_listings_user
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;