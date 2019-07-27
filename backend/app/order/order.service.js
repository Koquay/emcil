require('./order.model');
const Order = require('mongoose').model('Order')
const moment = require('moment-timezone');

exports.post = async(newOrder) => {
    try {
        const order = new Order(newOrder);
        order.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        console.log('order', order)
        order.save();
        return order;
    } catch(error) {
        throw error;
    }
}