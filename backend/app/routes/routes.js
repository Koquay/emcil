const IndexRoutes = require('../index/index.routes');
const ProductRoutes = require('../product/product.routes');

module.exports = (app) => {
    app.use('/api/product', ProductRoutes);
    app.use('/*', IndexRoutes);
}