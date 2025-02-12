require('./order.model');
const Order = require('mongoose').model('Order')
const Product = require('mongoose').model('Product')
const moment = require('moment-timezone');
const stripe = require('stripe')('sk_test_ybjdse51Sh1sgPPanyxXQANL007sdrs1D3');
var creditCardError = null;

exports.placeOrder = async (newOrder) => {

    try {
        const card_id = await chargeCard(newOrder);
        console.log('card_id', card_id)
        newOrder.card_id = card_id;

        const order = new Order(newOrder);
        order.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        console.log('order', order)
        order.save();
        return order;
    } catch (errorx) {
        console.log('errorx', errorx)
        let error = new Error();
        error.message = '1. There is a problem processing your order. Please try again or contact us.';
        error.status = '500';

        if (creditCardError) throw creditCardError;
        else throw error;
    }
}

exports.refundOrder = async (orderInfo) => {
    await refundWholeOrder(orderInfo);
    this.setOrderStatus({ orderNo: orderInfo.orderNo, status: orderInfo.status })
}

const chargeCard = async (newOrder) => {
    try {
        const result = await stripe.charges.create({
            amount: Math.round(newOrder.total) * 100,
            currency: 'cad',
            description: 'Order Number: ' + newOrder.order_no,
            source: newOrder.card_token,
            receipt_email: newOrder.customer.shipping_address.email,
        });

        if (!result.paid) {
            let creditCardError = new Error();
            creditCardError.message = '2. There is a problem charging your credit card. Please enter correct information';
            creditCardError.status = '500';
            throw creditCardError;
        }

        return result.id;
    } catch (error) {
        error.message = '1. There is a problem charging your credit card. Please enter correct information';
        throw error;
    }
}

const refundWholeOrder = async (orderInfo) => {
    console.log('REFUND CARD CALLED')
    try {
        const refund = await stripe.refunds.create({
            charge: orderInfo.card_id,
        });

        console.log('refund', refund)

        return refund.id;
    } catch (error) {
        error.message = '1. There is a problem refunding the credit card.';
        throw error;
    }
}

const refundPartialOrder = async (orderInfo) => {
    console.log('REFUND refundPartialOrder CALLED')
    console.log('orderInfo.card_id', orderInfo.card_id)
    console.log('orderInfo.amount', orderInfo.amount)
    console.log('process.env.PROCESSING_PERCENTAGE', process.env.PROCESSING_PERCENTAGE)
    console.log('process.env.PROCESSING_EXTRA', process.env.PROCESSING_EXTRA)
    

    let processingFee = +process.env.PROCESSING_PERCENTAGE * orderInfo.amount + +process.env.PROCESSING_EXTRA;
    console.log('processingFee', processingFee)
    
    try {
        const refund = await stripe.refunds.create({
            charge: orderInfo.card_id,
            amount: Math.round(orderInfo.amount - processingFee) * 100,
        });

        console.log('refund', refund)
    } catch (error) {
        console.log('refunPartialOrder error', error);
        error.message = '1. There is a problem partially refunding the credit card.';
        throw error;
    }
}

exports.getOrdersByStatus = async (status) => {
    try {
        const orders = await Order.find({ status: status });
        console.log('orders', orders)
        return orders;
    } catch (errorx) {
        let error = new Error();
        error.message = 'There is a problem getting orders by status. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

exports.searchOrder = async (searchCriteria) => {
    let searchParams = JSON.parse(searchCriteria);

    let aggregatePipeline = buildAggregatePipeline(searchParams);
    console.log('aggregatePipeline', aggregatePipeline)

    try {
        const orders = await Order.aggregate(aggregatePipeline);
        console.log('orders', orders)
        return orders;
    } catch (errorx) {
        let error = new Error();
        error.message = 'There is a problem searching for orders. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

const buildAggregatePipeline = (searchParams) => {
    let { order_no, phone } = searchParams;
    console.log('order_no', order_no)

    let aggregatePipeline = [];

    let orderNoMatch = buildOrderNoMatch(order_no);
    if (orderNoMatch) {
        aggregatePipeline.push(orderNoMatch);
    }

    let phoneMatch = buildPhoneMatch(phone);
    if (phoneMatch) {
        aggregatePipeline.push(phoneMatch);
    }

    aggregatePipeline.push(buildSortMatch());
    checkForEmptyAggregate(aggregatePipeline);

    return aggregatePipeline;
}

function checkForEmptyAggregate(aggregatePipeline) {
    if (aggregatePipeline.length == 0) {
        aggregatePipeline.push({ $match: { order_no: { $ne: null } } });
    }
}

const buildOrderNoMatch = (orderNo) => {
    if (orderNo && orderNo.trim().length) {
        return { $match: { order_no: { $eq: +orderNo.trim() } } }
    }

    return null;
}

const buildPhoneMatch = (phone) => {
    if (phone && phone.trim().length) {
        let match = { $match: { "customer.shipping_address.phone": { $eq: phone.trim() } } }
        console.log('phone match', match)
        return match;
    }

    return null;
}

const buildFirstNameMatch = (firstName) => {
    if (firstName.length) {
        return { $match: { first_name: firstName } }
    }

    return null;
}

function buildSortMatch() {
    return { $sort: { created_on: -1 } };
}

exports.getProductsForOrder = async (prodNos) => {
    try {
        const products = await Product.find({ product_no: { $in: prodNos } });
        console.log('products', products)
        return products;
    } catch (errox) {
        let error = new Error();
        error.message = 'There is a problem getting productss for orders. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

exports.setOrderStatus = async (orderInfo) => {
    console.log('orderInfo.status', orderInfo.status)
    let date = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');

    try {
        if (orderInfo.status == "Pending") {
            await Order.updateOne({ order_no: orderInfo.orderNo },
                { status: orderInfo.status, shipped_date: null})
        }
        else if (orderInfo.status == "Shipped") {
            await Order.updateOne({ order_no: orderInfo.orderNo },
                { status: orderInfo.status, shipped_date: date, refund_date: null})
        }
        else if (orderInfo.status == "Refunded") {
            await Order.updateOne({ order_no: orderInfo.orderNo },
                { status: orderInfo.status, refund_date: date, shipped_date: null })
        }

        return [];
    } catch (errorx) {
        let error = new Error();
        console.log('errorx', errorx)
        error.message = 'There is a problem setting order status. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

exports.getSearchedOrder = async (orderNo) => {
    try {
        const order = await Order.findOne({ order_no: orderNo });
        console.log('order', order)
        return order;
    } catch (errorx) {
        let error = new Error();
        error.message = 'Cannot get searched order. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

exports.deleteItem = async (orderInfo) => {
    console.log('*********** OrderService deleteItem ************')
    // console.log('orderInfo', orderInfo)
    let {order, itemId, itemAmount} = orderInfo;
    
    // console.log('order', order)
    console.log('order.cart_id', order.card_id)
    console.log('itemId', itemId)
    console.log('itemAmount', itemAmount)  

    try {
        const newOrder = await Order.findOneAndUpdate({ _id: order._id },
            {
                $pull: { order_items: { _id: itemId } },
                $set: {
                    subtotal: order.subtotal,
                    tax: order.tax,
                    total: order.total
                }
            },
            { new: true });

        await refundPartialOrder({card_id:order.card_id, amount:itemAmount});            

        if (newOrder.order_items.length == 0) {
            this.deleteOrder(newOrder._id);
            return null;
        }
        return newOrder;
    } catch (errorx) {
        console.log('errorx', errorx)
        let error = new Error();
        error.message = 'Problem deleting item. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

exports.deleteOrder = async (orderId) => {
    try {
        await Order.deleteOne({ _id: orderId });
        return [];
    } catch (errorx) {
        let error = new Error();
        error.message = 'Problem deleting order. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}