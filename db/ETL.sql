-- ONLY RUN THIS FILE AFTER schema.sql has been set-up in postgres

-- STEP #1: In command line, type psql catwalkoverview

-- STEP #2: create 'data' directory in SDC directory; move csv data files into 'data'
-- product.csv, features.csv, related.csv, styles.csv, skus.csv, photos.csv

-- Step #3: run SQL script below to load data into db

COPY products
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/product.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY features
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/features.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY related
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/related.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY styles
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/styles.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY skus
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/skus.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY photos
FROM '/Users/jacquesdubois/Desktop/HRSF-137/SDC/data/photos.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');