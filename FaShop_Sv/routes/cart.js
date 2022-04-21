var express = require("express");
var router = express.Router();
var cartController = require("../controllers/cart");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let cart = await cartController.getListCart();
  res.json({ data: cart });
});

router.post("/add", async function (req, res, next) {
  let body = req.body;
  let success = await cartController.addNewCart(body);
  res.json({ success: success });
});

router.delete("/delete/:id", async function (req, res, next) {
  let { params } = req;
  await cartController.remove(params);
  res.json({ res: true });
});

module.exports = router;
