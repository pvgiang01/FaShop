var orderDetailServices = require("../services/orderdetail");

exports.getListOrderDetail = async function getListOrderDetail() {
  return await orderDetailServices.getListOrderDetail();
};

exports.getDetailByOrderId = async function getDetailByOrderId(id) {
  return await orderDetailServices.getDetailByOrderId(id);
};
exports.createOrderDetail = async function (orderDetail) {
  return await orderDetailServices.createOrderDetail(orderDetail);
};
