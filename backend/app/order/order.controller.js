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