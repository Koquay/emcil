const router = require('express').Router();
const OrderController = require('./order.controller');

router.post('/', OrderController.post);

module.exports = router;