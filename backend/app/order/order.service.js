require('./order.model');
const Order = require('mongoose').model('Order')
const moment = require('moment-timezone');

exports.post = async (newOrder) => {
    try {
        const order = new Order(newOrder);
        order.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        console.log('order', order)
        order.save();
        return order;
    } catch (error) {
        throw error;
    }
}

exports.get = async (status) => {
    try {
        const orders = await Order.find({ status: status });
        console.log('orders', orders)
        return orders;
    } catch (error) {
        throw error;
    }
}

exports.search = async (searchCriteria) => {
    let searchParams = JSON.parse(searchCriteria);

    let aggregatePipeline = buildAggregatePipeline(searchParams);
    console.log('aggregatePipeline', aggregatePipeline)

    try {
        const orders = await Order.aggregate(aggregatePipeline);
        console.log('orders', orders)
        return orders;
    } catch (error) {
        throw error;
    }
}

const buildAggregatePipeline = (searchParams) => {
    let { order_no, first_name, last_name } = searchParams;
    console.log('order_no', order_no)

    let aggregatePipeline = [];

    let orderNoMatch = buildOrderNoMatch(order_no);
    if(orderNoMatch) {
        aggregatePipeline.push(orderNoMatch);
    }

    // let firstNameMatch = buildFirstNameMatch(first_name);
    // if(firstNameMatch) {
    //     aggregatePipeline.push(firstNameMatch);
    // }

    checkForEmptyAggregate(aggregatePipeline);

    return aggregatePipeline;
}

function checkForEmptyAggregate(aggregatePipeline) {
    if (aggregatePipeline.length == 0) {
        aggregatePipeline.push({ $match: { order_no: { $ne: null } } });
    }
}

const buildOrderNoMatch = (orderNo) => {
    if (orderNo.length) {
        return { $match: { order_no: { $eq: +orderNo } } }
    }

    return null;
}

const buildFirstNameMatch = (firstName) => {
    if (firstName.length) {
        return { $match: { first_name: firstName  } }
    }

    return null;
}