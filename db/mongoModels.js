const { Schema } = require('mongoose');

const productSchema = new Schema({
    id: {type: Number, unique: true},
    campus: String,
    name: {type: String, unique: true},
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    created_at: String,
    updated_at: String
});

const featureSchema = new Schema({
    id: {type: Number, unique: true},
    feature: String,
    value: String,
    product_id: Number
});

const styleSchema = new Schema({
    id: {type: Number, unique: true},
    name: String,
    original_price: String,
    sale_price: String,
    'default?': Boolean,
    product_id: Number
});

const skuSchema = new Schema({
    id: {type: Number, unique: true},
    quantity: Number,
    size: String,
    style_id: Number
});

const photoSchema = new Schema({
    id: {type: Number, unique: true},
    url: String,
    thumbnail_url: String,
    style_id: Number
});

module.exports = {
    Product: mongoose.model('Product', productSchema, 'CatwalkOverview'),
    Feature: mongoose.model('Feature', featureSchema, 'CatwalkOverview'),
    Style: mongoose.model('Style', styleSchema, 'CatwalkOverview'),
    Sku: mongoose.model('Sku', skuSchema, 'CatwalkOverview'),
    Photo: mongoose.model('Photo', photoSchema, 'CatwalkOverview')
};