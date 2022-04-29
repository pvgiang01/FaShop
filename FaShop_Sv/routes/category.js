var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category');
const productController = require('../controllers/product')
const upload = require('../middle/upload');
/* hiện trang product. */
router.get('/',async function(req, res, next) {
  const categories = await categoryController.getListCategories();
  res.render('./category/category',{categories:categories,title: "Categories"});
});
/* hiện trang thêm sp */
router.get('/add-category', async function(req, res, next) {
  res.render('./category/new-category',{title: "Add Category"});

});
/* thêm ms product */
router.post('/add-category',[upload.single('image')], async function(req, res, next) {
  let {body,file} = req;
  if(file){
    const image = 'http://10.82.181.249:3000/images/' + file.filename;
    body = {...body,image}
  }
  await categoryController.addNewCategory(body);
  res.redirect('/category');
});
/* hiện trang chi tiết product. */
router.get('/:id/edit', async function(req, res, next) {
  const {id} = req.params;
  const category = await categoryController.getCategoryById(id);
  res.render('./category/edit-category',{category,title: "Edit Category"});
});
/* cập nhật product. */
router.post('/:id/edit',[upload.single('image')], async function(req, res, next) {
    let {params,body,file} = req;
    if(file){
      const image = 'http://10.82.181.249:3000/images/' + file.filename;
      body = {...body,image}
    }
    body = {...body,_id:params.id}
    await categoryController.update(body);
    res.redirect('/category');
});
/* xóa product */
router.delete('/:id', async function(req, res, next) {
    const {params} = req;
    let category = params.id
    const product = await productController.getByCategoryId(category)
    if(product.length == 0){
      await categoryController.removeCategory((params.id));
    }else{
      console.log('k xoa dc')
    }
    res.json({result: true});
});
router.get("/search/:value", async function (req, res, next) {
  let key = req.params.value;
  let array = await categoryController.search(key);
  res.render('./category/category',{ array });
});
module.exports = router;