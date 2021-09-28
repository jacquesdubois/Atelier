const { Schema } = require('mongoose');

const productSchema = new Schema({
    _id: {type: Number, unique: true},
    campus: String,
    name: {type: String, unique: true},
    slogan: String,
    description: String,
    feature: [{ feature: String, value: String }],
    related: [Number], // maybe make this an array of product objects
    category: String,
    default_price: String,
    created_at: String,
    styles:[Number] // potentially include full Style object later on
});

const styleSchema = new Schema({
    _id: {type: Number, unique: true},
    name: String,
    original_price: String,
    sale_price: String,
    'default?': Boolean,
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    photos: [{ url: String, thumbnail_url: String }],
    skus: [Number]
});

// Nested Into Styles, but also kept separate for rapid inventory updates
const skuSchema = new Schema({
    _id: {type: Number, unique: true},
    quantity: Number,
    size: String,
    style_id: {
        type: Schema.Types.ObjectId,
        ref: 'Style'
    }
});

module.exports = {
    Product: mongoose.model('Product', productSchema, 'CatwalkOverview'),
    Style: mongoose.model('Style', styleSchema, 'CatwalkOverview'),
    Sku: mongoose.model('Sku', skuSchema, 'CatwalkOverview'),
};