const categoryService = require('../services/category')
exports.getListCategories = async function getListCategories(){
    return await categoryService.getListCategories();
}
exports.getCategoryById = async function(id){
    const category = await categoryService.getCategoryById(id);
    return category;
}
exports.addNewCategory = async function(body){
    const {name,image} = body;
    const category = {
        name:name,
        image:image
    }
    await categoryService.addNewCategory(category);
}
exports.update = async function(body){
    const {_id,name,image} = body;
    const category = {
        _id:_id,
        name:name,
        image:image 
    }
    await categoryService.update(category);
}
exports.removeCategory = async function(id){
    await categoryService.removeCategory(id);
}
exports.search = async function (keyword) {
    return await categoryService.search(keyword);
}