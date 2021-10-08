-- DROP DATABASE IF EXISTS CatwalkOverview;
-- CREATE DATABASE CatwalkOverview;

CREATE TABLE products(
    id SERIAL UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    slogan VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(30) NOT NULL,
    default_price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE features(
    id SERIAL UNIQUE NOT NULL,
    product_id INT NOT NULL,
    feature VARCHAR(30) NOT NULL,
    value VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE related(
    id SERIAL UNIQUE NOT NULL,
    product_id INT NOT NULL,
    related_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE styles(
    id SERIAL UNIQUE NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    sale_price INT CHECK (sale_price = null OR sale_price <= original_price),
    original_price INT NOT NULL CHECK (original_price >= sale_price),
    "default?" BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE skus(
    id SERIAL UNIQUE NOT NULL,
    style_id INT,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE TABLE photos(
    id SERIAL UNIQUE NOT NULL,
    style_id INT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE INDEX product_id_features_index ON features (product_id);

CREATE INDEX product_id_styles_index ON styles (product_id);

CREATE INDEX product_id_related_index ON related (product_id);

CREATE INDEX style_id_photos_index ON photos (style_id);

CREATE INDEX style_id_skus_index ON skus (style_id);
