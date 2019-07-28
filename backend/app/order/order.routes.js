const router = require('express').Router();
const OrderController = require('./order.controller');

router.get('/search', OrderController.search);
router.get('/:status', OrderController.get);
router.post('/', OrderController.post);

module.exports = router;