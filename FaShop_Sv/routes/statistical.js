var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order');

router.get('/', async function (req, res, next) {
    let canceledOrders = await orderController.getOrderByStatus("DaHuy");
    let deliveredOrders = await orderController.getOrderByStatus("DaGiao");
    let processing = await orderController.getOrderByStatus('Dangxuli');
    let delivering = await orderController.getOrderByStatus('DangGiao');
    res.render("./statistical/statistical", {deliveredOrders: deliveredOrders,
        canceledOrders: canceledOrders,processing:processing,delivering:delivering,title:"Statistical"});
});

module.exports = router;