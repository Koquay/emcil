const IndexRoutes = require('../index/index.routes');
const ProductRoutes = require('../product/product.routes');
const OrderRoutes = require('../order/order.routes');
const UserRoutes = require('../user/user.routes')

module.exports = (app) => {
    app.use('/api/product', ProductRoutes);
    app.use('/api/order', OrderRoutes);
    app.use('/api/user', UserRoutes);
    app.use('/*', IndexRoutes);
}