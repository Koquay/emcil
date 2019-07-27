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