const db = require('../db/poolIndex.js');

module.exports = {
    getProducts: (page, count, callback) => {
        // db.query(`SELECT * FROM products WHERE (id <= ${page * count})`, callback);
        db.query(`SELECT *
                    FROM products
                    ORDER BY id
                    LIMIT ${page * count}`,
                callback);
    },

    getProductInfo: (product_id, callback) => {
        // db.query(`SELECT * FROM products WHERE (id = ${product_id})`)
        //     .then((info) => {
        //         db.query(`SELECT feature, value FROM features WHERE (product_id = ${product_id})`)
        //             .then((features) => {
        //                 info.rows[0].features = features.rows;
        //                 callback(null, info.rows);
        //             })
        //             .catch((err) => callback(err))
        //     })
        //     .catch((err) => callback(err))
        db.query(`SELECT JSON_BUILD_OBJECT(
                    'id', products.id,
                    'name', products.name,
                    'slogan', products.slogan,
                    'description', products.description,
                    'category', products.category,
                    'default_price', products.default_price,
                    'features', (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'feature', features.feature,
                                'value', features.value
                            )
                        )
                        FROM features
                        WHERE features.product_id = products.id
                    )
                )
                FROM products
                WHERE products.id = ${product_id}
                GROUP BY products.id;
            `)
            .then((data) => {
                callback(null, data.rows[0].json_build_object)
            })
            .catch((err) => callback(err))
    },

    getStyles: (product_id, callback) => {
        // db.query(`
        //     SELECT styles.id, styles.name, styles.original_price, styles.sale_price, styles."default?", photos.url, photos.thumbnail_url, skus.id AS sku, skus.size, skus.quantity
        //         FROM styles
        //         LEFT JOIN photos
        //             ON photos.style_id = styles.id
        //         LEFT JOIN skus
        //             ON skus.style_id = styles.id
        //         WHERE styles.product_id = ${product_id}
        //         ORDER BY styles.id
        // `)
        // .then((data) => {
        //     const output = { product_id: product_id, results: []};
        //     for (let i = 0; i < data.rows.length; i++) {
        //         if (output.results.length === 0 || output.results[output.results.length - 1].style_id !== data.rows[i].id) {
        //             output.results.push({
        //                 style_id: data.rows[i].id,
        //                 name: data.rows[i].name,
        //                 original_price: data.rows[i].original_price,
        //                 sale_price: data.rows[i].sale_price,
        //                 "default?": data.rows[i]["default?"],
        //                 photos: [{thumbnail_url: data.rows[i].thumbnail_url, url: data.rows[i].url}],
        //                 skus: {}
        //             })
        //             output.results[output.results.length - 1].skus[`${data.rows[i].sku}`] = { size: data.rows[i].size, quantity: data.rows[i].quantity };
        //         } else {
        //             if (output.results[output.results.length - 1].photos[output.results[output.results.length - 1].photos.length - 1].url !== data.rows[i].url) {
        //                 output.results[output.results.length - 1].photos.push({
        //                     thumbnail_url: data.rows[i].thumbnail_url,
        //                     url: data.rows[i].url
        //                 })
        //             }
        //             output.results[output.results.length - 1].skus[`${data.rows[i].sku}`] = { size: data.rows[i].size, quantity: data.rows[i].quantity };
        //         }
        //     }
        //     callback(null, output)
        // })
        db.query(`
            SELECT JSON_BUILD_OBJECT(
                'id', styles.id,
                'name', styles.name,
                'sale_price', styles.sale_price,
                'original_price', styles.original_price,
                'default?', styles."default?",
                'photos', (
                SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                    'url', photos.url,
                    'thumbnail_url', photos.thumbnail_url
                    )
                )
                FROM photos
                WHERE photos.style_id = styles.id
            ),
            'skus', (
                SELECT JSON_OBJECT_AGG(skus.id,
                JSON_BUILD_OBJECT(
                    'size', skus.size,
                    'quantity', skus.quantity
                    )
                )
                FROM skus
                    WHERE skus.style_id = styles.id
                )
            )
            FROM styles
            WHERE styles.product_id = ${product_id}
            GROUP BY styles.id;
        `)
        .then((data) => {
            let results = [];
            data.rows.forEach((style) => {results.push(style.json_build_object)});
            let output = {
                product_id: product_id,
                results: results,
            }
            callback(null, output);
        })
    },

    getRelated: (product_id, callback) => {
        db.query(`SELECT related_id FROM related WHERE product_id = ${product_id}`)
        .then((data) => {
            // console.log(data.rows);
            const output = [];
            for (let i = 0; i < data.rows.length; i++) {
                output.push(data.rows[i].related_id);
            }
            callback(null, output);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteProduct: (product_id, callback) => {
        db.query(`DELETE FROM styles, featured, related WHERE product_id = ${product_id}`)
            .then(() => {
                db.query(`DELETE FROM products WHERE id = ${product_id}`)
                    .then(() => callback(null, `Product #${product_id} Deleted`))
            })
            .catch((err) => callaback(err));
    },

    createProduct: (data, callback) => {
        db.query(`INSERT INTO products(id, name, slogan, description, category, default_price)
                    VALUES (${data.product_id}, ${data.name}, ${data.slogan}, ${data.description},
                        ${data.category}, ${data.default_price})`)
            .then(() => callback(null, `Product #${data.product_id} Created`))
            .catch((err) => callback(err));
    }
};