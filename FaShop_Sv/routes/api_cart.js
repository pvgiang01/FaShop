var express = require("express");
var router = express.Router();
const cartController = require('../controllers/cart')
const userController = require('../controllers/users')
const orderController = require('../controllers/order')
const orderDetailController = require('../controllers/orderdetail')
const auth = require('../middle/authen')

router.get("/cart",async function(req,res,next){
    const p = await orderController.getListOrder()
    res.json(p)
})
router.post("/cart/new", auth.checkMobileAuthentication, async function (req, res, next) {
    const { _id, name, image, quantity, price } = req.body;
    let success = await cartController.addNewCart({
        id: _id,
        name: name,
        price: price,
        image: image,
        quantity: quantity,
        email: req.decode.email,
    });
    return res.json({ status: success });
}
);

router.post("/create-order", auth.checkMobileAuthentication, async function (req, res, next) {
    let { email, address } = req.decode;
    let user = await userController.getUserByEmail(email);
    let user_id = user._id;
    const { products, total, value, superTotal } = req.body;
    let list = [];
    for (const e of products) {
        list.push({ image: e.image ,name: e.name,quantity: e.quantity });
    }
    let newOrder = {
        user_id: user_id,
        status: "Dangxuli",
        createdTime: Date.now(),
        list: list,
    };
    let order_id = await orderController.createOrder(newOrder);
    console.log(order_id);
    let order_detail = {
        order_id: order_id,
        products: products,
        address: address,
        total: total,
        value: value,
        superTotal: superTotal
    };
    await orderDetailController.createOrderDetail(order_detail);
    res.json({ status: true });
}
);

router.post("/cart/update-quantity", async function (req, res, next) {
    const { id, quantity } = req.body;
    await cartController.updateQuantity(id, quantity);
    return res.json({ success: true });
});

router.post("/cart/change-quantity", async function (req, res, next) {
    const { id, t } = req.body;
    let success = await cartController.changeQuantity(id, t);
    return res.json({ success: success });
});

router.get("/cart/get", auth.checkMobileAuthentication, async function (req, res, next) {
    let list = await cartController.getListCart(req.decode.email);
    return res.json(list);
}
);
router.delete("/delete", async function (req, res, next) {
    let { params } = req;
    await cartController.remove(params.id);
    res.json({ res: true });
  });
module.exports = router;