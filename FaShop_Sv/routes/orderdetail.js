var express = require("express");
var router = express.Router();
var orderDetailController = require("../controllers/orderdetail");
const mongoose = require("mongoose");

router.get("/", async function (req, res, next) {
  let orderList = await orderDetailController.getListOrderDetail();
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
    }
    return { ...order._doc, formatStatus: tam };
  });
  res.render("./order/orderdetail", { orderDetailList, title: "Order detail" });
});

