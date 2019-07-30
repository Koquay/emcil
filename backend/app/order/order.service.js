require('./order.model');
const Order = require('mongoose').model('Order')
const Product = require('mongoose').model('Product')
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
    if (orderNoMatch) {
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
        return { $match: { first_name: firstName } }
    }

    return null;
}

exports.getProductsForOrder = async (prodNos) => {
    try {
        const products = await Product.find({ product_no: {$in: prodNos} });
        console.log('products', products)
        return products;
    } catch (error) {
        throw error;
    }
}

exports.setStatus = async (orderInfo) => {
    console.log('orderInfo.status', orderInfo.status)
    let date = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');

    try {
        if(orderInfo.status == "P") {
            await Order.updateOne({order_no:orderInfo.orderNo}, 
                {status:orderInfo.status, shipped_date:null, cancelled_date:null})    
        }
        else if(orderInfo.status == "S") {
            await Order.updateOne({order_no:orderInfo.orderNo}, 
                {status:orderInfo.status, shipped_date:date, cancelled_date:null})    
        }
        else if(orderInfo.status == "C") {
            await Order.updateOne({order_no:orderInfo.orderNo}, 
                {status:orderInfo.status, cancelled_date:date, shipped_date:null})    
        } 
        
        return [];
    } catch(error) {
        throw error;
    }
}

exports.getSearchedOrder = async (orderNo) => {
    try {
        const order = await Order.findOne({ order_no: orderNo });
        console.log('order', order)
        return order;
    } catch (error) {
        throw error;
    }
}