var cartModel = require("../models/cart");

exports.getListCart = async function (email) {
  let listCart = await cartModel.find({ email: email });
  return listCart;
};
exports.addNewCart = async function (cart) {
  const newCart = new cartModel(cart);

  let p = await cartModel.findOne({
    $and: [{ id: cart.id }, { email: cart.email }],
  });
  if (p) {
    this.updateQuantity(p._id, cart.quantity + p.quantity);
    return true;
  } else {
    return await newCart.save().then((savedDoc) => {
      return savedDoc != null;
    });
  }
};

exports.remove = async function (id) {
  await cartModel.remove({ id: id });
};

exports.updateQuantity = async function (id, quantity) {
  await cartModel.findOneAndUpdate({ _id: id }, { quantity: quantity });
};
exports.increaseQuantity = async function (id) {
  return await cartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 } })
  .then((data)=>{
    return  (data != null)
  })
};
exports.decreaseQuantity = async function (id) {
  return await cartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } })
  .then((data)=>{  
    return (data != null)
  })
};
