const router = require('express').Router();
const OrderController = require('./order.controller');

router.get('/prodForOrder/:orderNo', OrderController.getProductsForOrder);
router.get('/search', OrderController.search);
router.get('/:status', OrderController.get);
router.get('/:orderNo/1', OrderController.getSearchedOrder);
router.post('/:deleteItem/1', OrderController.deleteItem);
router.post('/:status', OrderController.setStatus);
router.post('/', OrderController.post);


module.exports = router;