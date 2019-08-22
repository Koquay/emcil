const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    province: String,
    postal_code: String
}, {_id: false});

const PaymentSchema = new Schema({
    credit_card_no: String,
    cvc: String,
    exp_month: String,
    exp_year: String,
}, {_id: false});

const CustomerSchema = new Schema({
    shippingAndBillingSame:Boolean,
    shipping_address: AddressSchema,
    billing_address: AddressSchema,
    payment: PaymentSchema
}, {_id: false});

const OrderItemSchema = new Schema({
    product_no: Number,
    quantity: Number,
    price: Number,
    size: String,
    shipped: Boolean,
    shipped_date: String,
    cancelled: Boolean,
    cancelled_date: Date
});

const OrderSchema = new Schema({
    order_no: {
        type: Number,
        unique: true
    },
    order_date: Date,
    shipped: Boolean,
    shipped_date: Date,
    cancelled: Boolean,
    cancelled_date: Date,
    refund: Boolean,
    refund_date: Date,
    delivery_date: Date,
    tax: Number,
    subtotal: Number,
    total: Number,
    customer: CustomerSchema,
    order_items: [OrderItemSchema],
    special_instructions: String,
    card_id: {
        type: String,
    },
    status: {
        type:String,
        default: "Pending"
    },
    created_on: {
        type:Date,
    }
});

mongoose.model('Order', OrderSchema, 'orders');
