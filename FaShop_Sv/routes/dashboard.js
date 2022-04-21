var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const voucherController = require('../controllers/voucher');
const orderController = require('../controllers/order');

router.get('/', async function (req, res, next) {
    let users = await userController.getListUsers();
    let products = await productController.getListProducts();
    let categories = await categoryController.getListCategories();
    let vouchers = await voucherController.getListVouchers();
    let canceledOrders = await orderController.getOrderByStatus("DaHuy");
    let deliveredOrders = await orderController.getOrderByStatus("DaGiao");
    let processing = await orderController.getOrderByStatus('Dangxuli');
    let delivering = await orderController.getOrderByStatus('DangGiao');
    res.render("./dashboard/home", {users: users, products: products, categories: categories,
        vouchers: vouchers, deliveredOrders: deliveredOrders,
        canceledOrders: canceledOrders,processing:processing,delivering:delivering,title:"Dashboard"});
});

module.exports = router;