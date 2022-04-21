var express = require("express");
var router = express.Router();
var orderController = require("../controllers/order");
var userController = require("../controllers/users");
const mongoose = require("mongoose");

var statusList = [
  { id: "DangGiao", name: "Đang giao" },
  { id: "DaGiao", name: "Đã giao" },
  { id: "DaHuy", name: "Đã hủy" },
  { id: "Dangxuli", name: "Đang xử lí" },
];

/* GET home page. */
router.get("/", async function (req, res, next) {
  let orderList = await orderController.getListOrder();
  orderList = orderList.map((order) => {
    let tam = "";
    switch (order.status) {
      case "DangGiao":
        tam = "Đang giao";
        break;
      case "DaGiao":
        tam = "Đã giao";
        break;
      case "DaHuy":
        tam = "Đã hủy";
        break;
      case "Dangxuli":
        tam = "Đang xử lí";
        break;
    }
    return { ...order._doc, formatStatus: tam };
  });
  res.render("./order/order", { orderList, title:"Order" });
});
/* GET order by id page. */
router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let order = await orderController.getOrdersById(id);
  let user = await userController.getUserById(order.user_id);
  res.render("./order/edit", { order, user, statusList, title: "Edit order" });
});

//order detail
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let order = await orderController.getOrdersById(id);
  let user = await userController.getUserById(order.user_id);
  let orderDetail = await orderController.getDetailByOrderId(id);
  let total = 0;
  orderDetail.products.forEach((element) => {
    total += element.price * element.quantity;
  });
  console.log(">>>>>>>>>>>>", total);
  res.render("./order/orderdetail", { order, user, orderDetail , total, title:"Order detail"});
});

//
router.post("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let _id = mongoose.Types.ObjectId(id);
  var status = req.body.status;

  console.log(_id);
  await orderController.postEditOrder(_id, status);
  res.redirect("/order");
});

// 
router.get("/search/:value", async function (req, res, next) {
  let key = req.params.value;
  let orderList = await orderController.search(key);
  orderList = orderList.map((order) => {
    let tam = "";
    switch (order.status) {
      case "DangGiao":
        tam = "Đang giao";
        break;
      case "DaGiao":
        tam = "Đã giao";
        break;
      case "DaHuy":
        tam = "Đã hủy";
        break;
      case "Dangxuli":
        tam = "Đang xử lí";
        break;
    }
    return { ...order._doc, formatStatus: tam };
  });
  res.render('./order/order',{ orderList, statusList });

});
module.exports = router;
