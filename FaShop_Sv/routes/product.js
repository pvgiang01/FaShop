var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const upload = require('../middle/upload');
const authen = require('../middle/authen');
/* hiện trang product. */
router.get('/', async function(req, res, next) {
  const product = await productController.getListProducts();
  const categories = await categoryController.getListCategories();
  res.render('./product/product',{product, categories});
});
/* hiện trang thêm sp */
router.get('/add-product', async function(req, res, next) {
  const category = await categoryController.getListCategories();
  res.render('./product/new-product',{category,title:"Add Product"});

});
/* thêm ms product */
router.post('/add-product',[upload.single('image')], async function(req, res, next) {
  let {body,file} = req;
  if(file){
    const image = 'http://192.168.1.151:3000/images/' + file.filename;
    body = {...body,image}
  }
  await productController.addNewProduct(body);
  res.redirect('/product');
});
/* hiện trang chi tiết product. */
router.get('/:id/edit', async function(req, res, next) {
  const {id} = req.params;
  const product = await productController.getProductById(id)
  const category = await categoryController.getListCategories();
  res.render('./product/edit-product',{product,category,title:"Edit Product"});
});
/* cập nhật product. */
router.post('/:id/edit',[upload.single('image')], async function(req, res, next) {
    let {params,body,file} = req;
    if(file){
      const image = 'http://192.168.1.151:3000/images/' + file.filename;
      body = {...body,image}
    }
    body = {...body,_id:params.id}
    await productController.update(body);
    res.redirect('/product');
});
/* xóa product */
router.delete('/:id', async function(req, res, next) {
    const {params} = req;
    await productController.delete((params.id));
    res.json({result: true});
});
router.get("/search/:value", async function (req, res, next) {
  let key = req.params.value;
  let product = await productController.search(key);
  res.render('./product/product',{ product });
});
module.exports = router;
