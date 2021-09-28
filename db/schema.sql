-- DROP DATABASE IF EXISTS test;
-- CREATE DATABASE CatwalkOverview;

-- \c CatwalkOverview

-- Add more not nulls
-- Add additional validation

CREATE TABLE products(
    id INT UNIQUE NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    slogan VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    category VARCHAR(30) NOT NULL,
    default_price INT NOT NULL CHECK (default_price > 0),
    created_at VARCHAR(30) NOT NULL,
    updated_at VARCHAR(30) NOT NULL CHECK (updated_at > created_at),
    PRIMARY KEY (id)
);

CREATE TABLE features(
    id INT UNIQUE NOT NULL,
    feature VARCHAR(30) NOT NULL,
    value VARCHAR(30) NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);

CREATE TABLE related(
    id INT UNIQUE NOT NULL,
    product_id INT NOT NULL,
    related_id INT NOT NULL,
    -- orderVar INT,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);

CREATE TABLE styles(
    id INT UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    original_price INT NOT NULL CHECK (original_price > sale_price AND original_price > 0),
    sale_price INT CHECK (sale_price = null OR sale_price < original_price),
    "default?" BOOLEAN NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE skus(
    id INT UNIQUE NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    style_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE TABLE photos(
    id INT UNIQUE NOT NULL,
    url VARCHAR(200) NOT NULL,
    thumbnail_url VARCHAR(200) NOT NULL,
    style_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id)
        REFERENCES styles (id)
);

\d