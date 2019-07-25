const router = require('express').Router();
const ProductController = require('./product.controller');

router.get('/:product_type', ProductController.getByProductType);

module.exports = router;