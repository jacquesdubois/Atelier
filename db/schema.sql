-- DROP DATABASE IF EXISTS test;
CREATE DATABASE CatwalkOverview;

\c CatwalkOverview

CREATE TABLE products(
    id INT,
    campus VARCHAR(30),
    name VARCHAR(30),
    slogan VARCHAR(50),
    description VARCHAR(250),
    category VARCHAR(30),
    default_price VARCHAR(30),
    created_at VARCHAR(30),
    updated_at VARCHAR(30)
);

CREATE TABLE features(
    id INT,
    feature VARCHAR(30),
    value VARCHAR(30),
    product_id INT
);

CREATE TABLE styles(
    id INT,
    name VARCHAR(30),
    original_price VARCHAR(30),
    sale_price VARCHAR(30),
    default? VARCHAR(10),
    product_id INT
);

CREATE TABLE skus(
    id INT,
    quantity INT,
    size VARCHAR(10),
    style_id INT
);

CREATE TABLE photos(
    id INT,
    url VARCHAR(200),
    thumbnail_url VARCHAR(200),
    style_id INT
);

\d