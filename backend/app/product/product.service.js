require('./product.model');
const chalk = require('chalk');
const Product = require('mongoose').model('Product')

exports.getByProductType = async (productType) => {
    console.log(chalk.blue('productType', productType));

    try {

        // await Product.updateMany({ "product_type": "handbags"},{$unset: {"available_sizes":1}},{multi: true});
        const products = await Product.find({product_type: productType});
        console.log('products', products);
        return products;
    } catch(error) {
        throw error;
    }
}