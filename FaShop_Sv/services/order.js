var orderModel = require("../models/oder");
var orderdetailModel = require("../models/oderdetail");
exports.getListOrder = async function getListOrder() {
  let listOrder = await orderModel.find().populate("user_id");
  return listOrder;
};

exports.getOrdersById = async function getOrdersById(id) {
  return await orderModel.findById(id);
};

// order detail
exports.getDetailByOrderId = async function getDetailByOrderId(id) {
  return await orderdetailModel.findOne({ order_id: id });
};

// update order information
exports.postEditOrder = async (id, status) => {
  try {
    return await orderModel.findByIdAndUpdate(id, { $set: { status: status } });
  } catch (error) {
    return false;
  }
};
//search
exports.search = async function (keyword) {
  let temp = await orderModel.find().populate("user_id");
  if (keyword == "false") {
    return temp;
  }
  return await temp.filter((s) =>
    s.status.toLowerCase().includes(keyword.toLowerCase())
  );
};

exports.createOrder = async function (order) {
  const p = new orderModel(order);
  return await p
    .save()
    .then((data) => {
      return data._id;
    })
    .catch((error) => console.log(error));
};
exports.getOrderByStatus = async (status) => {
  let all = await orderModel.find({status: status})
  return all;
}
