var orderServices = require("../services/order");

exports.getListOrder = async function getListOrder() {
  return await orderServices.getListOrder();
};
exports.getOrdersById = async function getOrdersById(id) {
  return await orderServices.getOrdersById(id);
};
exports.postEditOrder = async (id, status) => {
  let a = await orderServices.postEditOrder(id, status);
  return a;
};

// Order detail
exports.getDetailByOrderId = async function getDetailByOrderId(id) {
  return await orderServices.getDetailByOrderId(id);
};
// search
exports.search = async function (keyword) {
  return await orderServices.search(keyword);
};

exports.createOrder = async function (order) {
  return await orderServices.createOrder(order);
};

exports.getOrderByStatus = async (status) => {
    return await orderServices.getOrderByStatus(status);
}
