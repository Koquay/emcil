const router = require('express').Router();
const OrderController = require('./order.controller');
const UserController = require('../user/user.controller');

router.get('/prodForOrder/:orderNo', OrderController.getProductsForOrder);
router.get('/search', UserController.authenticate, OrderController.searchOrder);
router.get('/:status', UserController.authenticate, OrderController.getOrdersByStatus);
router.get('/:orderNo/1', OrderController.getSearchedOrder);
router.post('/:deleteItem/1', UserController.authenticate, OrderController.deleteItem);
router.post('/:status', UserController.authenticate, OrderController.setOrderStatus);
router.post('/', OrderController.post);


module.exports = router;