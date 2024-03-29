const models = require('./models.js');

module.exports = {
    getProducts: (req, res) => {
        const page = req.query.page || 1;
        const count = req.query.count || 5;
        res.header("Access-Control-Allow-Origin", "*");
        models.getProducts(page, count, (err, data) => {
            err
            ? res.status(500).send('Error getting products')
            : res.status(200).send(data.rows);
        })
    },

    getProductInfo: (req, res) => {
        const product_id = req.params.product_id;
        res.header("Access-Control-Allow-Origin", "*");
        models.getProductInfo(product_id, (err, data) => {
            if (err) {
                console.log('Error');
                res.status(500).send('Error getting product info')
            } else {
                console.log('Success');
                res.status(200).send(data);
            }
        })
    },

    getStyles: (req, res) => {
        const product_id = req.params.product_id;
        res.header("Access-Control-Allow-Origin", "*");
        models.getStyles(product_id, (err, data) => {
            if (err) {
                console.log('Error');
                res.status(500).send('Error getting product styles')
            } else {
                console.log('Success');
                res.status(200).send(data);
            }
        })
    },

    getRelated: (req, res) => {
        const product_id = req.params.product_id;
        res.header("Access-Control-Allow-Origin", "*");
        models.getRelated(product_id, (err, data) => {
            err
            ? res.status(500).send('Error getting related products')
            : res.status(200).send(data);
        })
    },

    deleteProduct: (req, res) => {
        const product_id = req.params.product_id;
        res.header("Access-Control-Allow-Origin", "*");
        models.deleteProduct(product_id, (err, data) => {
            err
            ? res.status(500).send('Error deleting product')
            : res.status(200).send(data);
        })
    },

    createProduct: (req, res) => {
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        models.deleteProduct(data, (err, data) => {
            err
            ? res.status(500).send('Error deleting product')
            : res.status(200).send(data);
        })
    }
};