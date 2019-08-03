require('./product.model');
const chalk = require('chalk');
const Product = require('mongoose').model('Product')

exports.getByProductType = async (productType) => {
    console.log(chalk.blue('productType', productType));

    try {       
        const products = await Product.find({ product_type: productType });
        console.log('products', products);
        return products;
    } catch (errorx) {
        let error = new Error();
        error.message = 'There is a problem getting Products by type.';
        error.status = '500';
        throw error;
    }
}