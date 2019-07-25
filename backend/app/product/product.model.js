const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new Schema({
    product_no: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
    },
    product_type: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    list_price: {
        type: Number,
        required: true
    },
    available_sizes: [String],
    images: [String],
    created_on: {
        type:Date,
        default: Date.now
    }    
});

mongoose.model('Product', ProductSchema, 'product');