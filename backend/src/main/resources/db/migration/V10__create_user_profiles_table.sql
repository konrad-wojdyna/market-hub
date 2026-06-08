

CREATE TABLE user_profiles (
    user_id BIGINT PRIMARY KEY,
    avatar_url VARCHAR(512),
    bio TEXT,
    city VARCHAR(100),
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_profiles FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
