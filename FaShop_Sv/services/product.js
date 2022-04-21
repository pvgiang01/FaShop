const productModel = require('../models/product');

exports.getListProducts = async function () {
  return await productModel.find().populate('category');
}
exports.addNewProduct = async function (product) {
  const p = new productModel(product);
  await p.save();
}
exports.getProductById = async function getProductById(id) {
  return await productModel.findById(id);
}
exports.update = async function (product) {
  let doc = await productModel.findById(product._id);
  if (doc) {
    doc.name = product.name;
    doc.price = product.price;
    doc.category = product.category;
    doc.image = product.image ? product.image : doc.image;
    doc.description = product.description;
    doc.available = product.available;
    doc.published = product.published;
    await doc.save();
  }
}
exports.remove = async function (_id) {
  await productModel.remove({ _id: _id });
}
exports.getByCategoryId = async function getByCategoryId(id) {
  return await productModel.find({'category': id});
}

// search
exports.search = async function (keyword) {
  let temp = await productModel.find().populate("category")
  if (keyword == "false") {
    return temp
  }
  return await temp.filter((s) =>
    s.name.toLowerCase().includes(keyword.toLowerCase())
  )
}
