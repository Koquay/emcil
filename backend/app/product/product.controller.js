const chalk = require('chalk');
const ProductService = require('./product.service');

exports.getByProductType = async(req, res) => {
    console.log(chalk.blue('*** ProdctController called ***'));        
    const productType = req.params.product_type;
    console.log('productType', productType);

    try {
        const products = await ProductService.getByProductType(productType);    
        res.status(200).json(products);
        return;
    } catch(error) {
        throw error;
    }
}