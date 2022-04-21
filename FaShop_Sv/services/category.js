const categoryModel = require('../models/category')
exports.getListCategories = async function getListCategories(){
    return await categoryModel.find();
}
exports.getCategoryById = async function (_id) {
    const category = await categoryModel.findById(_id);
    return category;
}
exports.addNewCategory = async function (category) {
    const p = new categoryModel(category);
    await p.save();
}
exports.update = async function (category) {
    let doc = await categoryModel.findById(category._id);
    if (doc) {
        doc.name =  category.name;
        doc.image = category.image ? category.image : doc.image;
        await doc.save();
    }
}
exports.removeCategory = async function (_id) {
    await categoryModel.remove({ _id: _id });
}
exports.search = async function (keyword) {
    let temp = await categoryModel.find();
    if (keyword == "false") {
      return temp;
    }
    return await temp.filter((s) =>
      s.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };








