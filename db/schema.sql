-- DROP DATABASE IF EXISTS CatwalkOverview;
-- CREATE DATABASE CatwalkOverview;

CREATE TABLE products(
    id INT UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    slogan VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(30) NOT NULL,
    default_price INT NOT NULL,
    -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP CHECK (updated_at >= created_at),
    PRIMARY KEY (id)
);

CREATE TABLE features(
    id INT UNIQUE NOT NULL,
    product_id INT NOT NULL,
    feature VARCHAR(30) NOT NULL,
    value VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE related(
    id INT UNIQUE NOT NULL,
    product_id INT NOT NULL,
    related_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE styles(
    id INT UNIQUE NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    sale_price INT CHECK (sale_price = null OR sale_price <= original_price),
    original_price INT NOT NULL CHECK (original_price >= sale_price),
    "default?" BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE skus(
    id INT UNIQUE NOT NULL,
    style_id INT,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE TABLE photos(
    id INT UNIQUE NOT NULL,
    style_id INT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles (id)
);
