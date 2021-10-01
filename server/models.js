const { response } = require('express');
const db = require('../db/clientIndex.js');

module.exports = {
    getProducts: (page, count, callback) => {
        db.query(`SELECT * FROM products WHERE (id <= ${page * count})`, callback);
    },

    getProductInfo: (product_id, callback) => {
        db.query(`SELECT * FROM products WHERE (id = ${product_id})`)
            .then((info) => {
                db.query(`SELECT feature, value FROM features WHERE (product_id = ${product_id})`)
                    .then((features) => {
                        info.rows[0].features = features.rows;
                        callback(null, info.rows);
                    })
                    .catch((err) => callback(err))
            })
            .catch((err) => callback(err))
    },

    getStyles: async (product_id, callback) => {
        db.query(`
            SELECT styles.id, styles.name, styles.original_price, styles.sale_price, styles."default?", photos.url, photos.thumbnail_url, skus.id AS sku, skus.size, skus.quantity
                FROM styles
                LEFT JOIN photos
                    ON photos.style_id = styles.id
                LEFT JOIN skus
                    ON skus.style_id = styles.id
                WHERE styles.product_id = ${product_id}
        `)
        .then((data) => {
            //declare output with product id in it and results as the second key
            const output = { product_id: product_id, results: []};
            // loop through data.rows
            for (let i = 0; i < data.rows.length; i++) {
                // if last index in output.results is undefined or not equal to current style id
                if (output.results.length === 0 || output.results[output.results.length - 1].style_id !== data.rows[i].id) {
                    // push current object into results
                    output.results.push({
                        style_id: data.rows[i].id,
                        name: data.rows[i].name,
                        original_price: data.rows[i].original_price,
                        sale_price: data.rows[i].sale_price,
                        "default?": data.rows[i]["default?"],
                        photos: [{thumbnail_url: data.rows[i].thumbnail_url, url: data.rows[i].url}],
                        skus: {}
                    })
                    // declare sku key and size/quanity vals in skus obj
                    output.results[output.results.length - 1].skus[`${data.rows[i].sku}`] = { size: data.rows[i].size, quantity: data.rows[i].quantity };
                // otherwise,
                } else {
                    // push url & thumbnail_url into photos as an object
                    if (output.results[output.results.length - 1].photos[output.results[output.results.length - 1].photos.length - 1].url !== data.rows[i].url) {
                        output.results[output.results.length - 1].photos.push({
                            thumbnail_url: data.rows[i].thumbnail_url,
                            url: data.rows[i].url
                        })
                    }
                    // push sku into skus; push size and quantity into sku
                    output.results[output.results.length - 1].skus[`${data.rows[i].sku}`] = { size: data.rows[i].size, quantity: data.rows[i].quantity };
                }
            }
            // console.log('OUTPUT: ', output)
            callback(null, output)
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
    }
};