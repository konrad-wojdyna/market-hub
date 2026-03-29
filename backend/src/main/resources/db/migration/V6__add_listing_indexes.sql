CREATE INDEX idx_listings_title_lower ON listings (LOWER(title));

CREATE INDEX idx_listings_price ON listings (price);

CREATE INDEX idx_listings_category_id ON listings (category_id);

CREATE INDEX idx_listings_location ON listings (location);

CREATE INDEX idx_listings_created_at ON listings (created_at DESC);