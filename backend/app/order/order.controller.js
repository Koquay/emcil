const OrderService = require('./order.service');
const ErrorHandler = require('../error/error-handler');

exports.placeOrder = async (req, res) => {
    console.log('*** Order Controller ***');
    const newOrder = req.body.order;

    try {
        const order = await OrderService.placeOrder(newOrder);
        res.status(201).json(order);
        return;
    } catch (error) {
        return ErrorHandler.handleError('ORDER POSTING ERROR', res, error);
    }
}

exports.getOrdersByStatus = async (req, res) => {
    console.log('*** Order Controller GET ***');
    console.log('req.params', req.params)

    try {
        const orders = await OrderService.getOrdersByStatus(req.params.status);
        res.status(200).json(orders);
        return;
    } catch (error) {
        return ErrorHandler.handleError('ORDER BY STATUS ERROR', res, error);
    }
}

exports.searchOrder = async (req, res) => {
    console.log('*** Order Controller SEARCH ***');
    console.log('req.query', req.query)

    try {
        const orders = await OrderService.searchOrder(req.query.searchCriteria);
        res.status(200).json(orders);
        return;
    } catch (error) {
        return ErrorHandler.handleError('ORDER SEARCH ERROR', res, error);
    }
}

exports.getProductsForOrder = async (req, res) => {
    console.log('*** Order getProductsForOrder ***');
    console.log('req.query', req.query)
    let prodNos = JSON.parse(req.query.prodNos);

    try {
        const products = await OrderService.getProductsForOrder(prodNos);
        res.status(200).json(products);
        return;
    } catch (error) {
        return ErrorHandler.handleError('PRODUCTS FOR ORDER ERROR', res, error);
    }
}

exports.setOrderStatus = async (req, res) => {
    try {
        console.log('*** Order setstatus ***', req.body)
        const orders = OrderService.setOrderStatus(req.body);
        return res.json([]);
    } catch (error) {
        return ErrorHandler.handleError('ORDER STUTUS ERROR', res, error);
    }
}

exports.refundOrder = async (req, res) => {
    try {
        console.log('*** Order refundCard ***', req.body)
        const orders = OrderService.refundOrder(req.body);
        return res.json([]);
    } catch (error) {
        return ErrorHandler.handleError('ORDER STUTUS ERROR', res, error);
    }
}

exports.getSearchedOrder = async (req, res) => {
    console.log('*** Order Controller getSearchedOrder ***');
    console.log('req.params', req.params)

    try {
        const order = await OrderService.getSearchedOrder(req.params.orderNo);
        res.status(200).json(order);
        return;
    } catch (error) {
        return ErrorHandler.handleError('SEARCH ORDER ERROR', res, error);
    }
}


exports.deleteItem = async (req, res) => {
    console.log('*** Order Controller deleteItem ***');
    console.log('req.body', req.body)

    try {
        const order = await OrderService.deleteItem(req.body.order, req.body.itemId);
        return res.status(201).json(order);
    } catch (error) {
        return ErrorHandler.handleError('DELETE ITEM ERROR', res, error);
    }
}

