const OrderService = require('./order.service');

exports.post = async (req, res) => {
    console.log('*** Order Controller ***');
    
    try {
        const order = await OrderService.post(req.body.order);
        res.status(201).json(order);
        return;
    } catch(error) {
        throw error;
    }    
}

exports.get = async (req, res) => {
    console.log('*** Order Controller GET ***');
    console.log('req.params', req.params)
    
    try {
        const orders = await OrderService.get(req.params.status);
        res.status(200).json(orders);
        return;
    } catch(error) {
        throw error;
    }    
}

exports.search = async (req, res) => {
    console.log('*** Order Controller SEARCH ***');
    console.log('req.query', req.query)
    
    try {
        const orders = await OrderService.search(req.query.searchCriteria);
        res.status(200).json(orders);
        return;
    } catch(error) {
        throw error;
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
    } catch(error) {
        throw error;
    }    
}

exports.setStatus = async(req, res) => {
    try {
        console.log('*** Order setstatus ***', req.body)
        const orders = OrderService.setStatus(req.body);
        return res.json([]);
    } catch(error) {
        throw error;
    }
}

exports.getSearchedOrder = async (req, res) => {
    console.log('*** Order Controller getSearchedOrder ***');
    console.log('req.params', req.params)
    
    try {
        const order = await OrderService.getSearchedOrder(req.params.orderNo);
        res.status(200).json(order);
        return;
    } catch(error) {
        throw error;
    }    
}