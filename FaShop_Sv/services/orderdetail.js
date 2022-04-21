var orderdetailModel = require("../models/oderdetail");

exports.getOrderDetailsById = async function getOrderDetailsById(id) {
  return await orderdetailModel.findById(id);
};
exports.getDetailByOrderId = async function getDetailByOrderId(id) {
  return await orderdetailModel.findOne({ id });
};

exports.createOrderDetail = async function (orderDetail) {
  const p = new orderdetailModel(orderDetail);
  return await p.save();
};
