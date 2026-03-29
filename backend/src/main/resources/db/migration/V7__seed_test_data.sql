

INSERT INTO listings (title, description, price, category_id, location, user_id, created_at,
                      updated_at)
SELECT
    'Ogłoszenie ' || i,
    'Opis ogłoszenia ' || i,
    (random() * 9000 + 100)::numeric(10, 2),
    (floor(random() * 8) + 1)::bigint,
    (ARRAY['Warszawa', 'Kraków', 'Gdańsk', 'Łódź', 'Wrocław', 'Poznań'])[floor(random() * 6) + 1],
    (ARRAY[6,7])[floor(random() * 2) + 1]::bigint,
    NOW() - (random() * interval '365 days'),
    NOW()
FROM generate_series(1, 1000) AS i;