var cartServices = require("../services/cart");

exports.getListCart = async function (email) {
  return await cartServices.getListCart(email);
};
exports.addNewCart = async function (cart) {
  return await cartServices.addNewCart(cart);
};
exports.remove = async function (id) {
  await cartServices.remove(id);
};
exports.updateQuantity = async function (id, quantity) {
  await cartServices.updateQuantity(id, quantity);
};
exports.changeQuantity = async function (id, t) {
  if (t) {
    return await cartServices.increaseQuantity(id);//tăng sl
  }else{
    return await cartServices.decreaseQuantity(id);//giảm
  }
};