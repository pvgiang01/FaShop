var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category');

router.get("/category", async function (req, res, next) {
    let listC = await categoryController.getListCategories();
    listC = [{ _id: "all", name: "All", image: "" }, ...listC];
    res.json(listC);
  });

module.exports = router;