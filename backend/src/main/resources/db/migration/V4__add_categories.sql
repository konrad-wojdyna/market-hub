DELETE FROM listings;

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(100),
    display_order INT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

INSERT INTO categories(name, slug, display_order, active) VALUES
('Elektronika', 'elektronika', 1, true),
('Motoryzacja', 'motoryzacja', 2, true),
('Nieruchomości', 'nieruchomosci', 3, true),
('Moda', 'moda', 4, true),
('Dom i Ogród', 'dom-i-ogrod', 5, true),
('Sport i Hobby', 'sport-i-hobby', 6, true),
('Dla Dzieci', 'dla-dzieci', 7, true),
('Praca', 'praca', 8, true);

ALTER TABLE listings DROP COLUMN category;

ALTER TABLE listings ADD COLUMN category_id BIGINT NOT NULL
REFERENCES categories(id);