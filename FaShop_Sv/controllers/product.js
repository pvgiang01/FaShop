const productService = require('../services/product')
exports.getListProducts = async function () {
    return await productService.getListProducts();
}
exports.getProductById = async function getProductById(id) {
    return await productService.getProductById(id);
}
exports.addNewProduct = async function (body) {
    const { name, price, category, image, available, description, published } = body;
    const product = {
        name: name,
        price: price,
        category: category,
        image: image,
        available: available ? true : false,
        description: description,
        published: published
    }
    await productService.addNewProduct(product);
}
exports.update = async function (body) {
    const { _id, name, price, category, image, description, published, available } = body;
    const product = {
        _id: _id,
        name: name,
        price: Number(price),
        category: category,
        image: image,
        description: description,
        available: available ? true : false,
        published: published
    }
    await productService.update(product);
}
exports.delete = async function (id) {
    await productService.remove(id);
}
exports.getByCategoryId = async function getByCategoryId(id) {
    return await productService.getByCategoryId(id);
}
exports.search = async function (keyword) {
    return await productService.search(keyword);
};
