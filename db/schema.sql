-- DROP DATABASE IF EXISTS test;
CREATE DATABASE CatwalkOverview;

\c CatwalkOverview

CREATE TABLE products(
    id INT UNIQUE NOT NULL,
    campus VARCHAR(30),
    name VARCHAR(30) UNIQUE NOT NULL,
    slogan VARCHAR(50),
    description VARCHAR(250),
    category VARCHAR(30) NOT NULL,
    default_price VARCHAR(30),
    created_at VARCHAR(30),
    updated_at VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE features(
    id INT UNIQUE NOT NULL,
    feature VARCHAR(30),
    value VARCHAR(30),
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);

CREATE TABLE styles(
    id INT UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    original_price VARCHAR(30) NOT NULL,
    sale_price VARCHAR(30),
    `default?` BOOLEAN,
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);

CREATE TABLE skus(
    id INT UNIQUE NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(10),
    style_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id)
        REFERENCES styles (id)
);

CREATE TABLE photos(
    id INT UNIQUE NOT NULL,
    url VARCHAR(200),
    thumbnail_url VARCHAR(200),
    style_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id)
        REFERENCES styles (id)
);

\d