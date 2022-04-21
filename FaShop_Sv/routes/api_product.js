var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');

router.get('/product', async function (req, res, next) {
  const product = await productController.getListProducts();
  res.json(product);
});
router.get("/category/:id", async function (req, res, next) {
  let id = req.params.id;
  if (id == "all") {
    let listProduct = await productController.getListProducts();
    return res.json(listProduct);
  } else {
    let list = await productController.getByCategoryId(id);
    return res.json(list);
  }
});

// router.get("/product/:id", async function (req, res, next) {
//   let list = await productController.getByCategoryId(req.params);
//   return res.json(list);
// });
router.get("/search/:value", async function (req, res, next) {
  let list = await productController.search(req.params.value);
  return res.status(200).json(list);
});
router.post("/get-total", async function (req, res, next) {
  console.log(req.body)
    let { list } = req.body;
    let total = 0;
    for (const e of list) {
      let product = await productController.getProductById(e.id);
      total = total + product.price * e.quantity;
    }
    return res.json({ total: total });
});
module.exports = router;