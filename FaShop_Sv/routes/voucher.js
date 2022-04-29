var express = require("express");
const upload = require("../middle/upload");
var router = express.Router();
var voucherController = require("../controllers/voucher");
var imageToBase64 = require("image-to-base64");
var moment = require("moment");
const fs = require("fs");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let voucher = await voucherController.getListVouchers();
  res.render("./voucher/voucher", { voucher : voucher, title : "Voucher" });
});

/* GET add page. */
router.get("/addVoucher", async function (req, res, next) {
  res.render("./voucher/addVoucher",{title:"Add Voucher"});
});

/* POST Add prod page. */
//checkLogin.check,
var middleAddVoucher = [upload.single("image")];
router.post("/addVoucher", middleAddVoucher, async function (req, res, next) {
  let {body,file} = req;
  let date = moment(body.date + " " + body.time + ":00");
  body = { ...body, expiredTime: date.utcOffset("+0700").toDate().getTime() };
  if(file){
    const image = 'http://10.82.181.249:3000/images/' + file.filename;
    body = {...body,image}
  }
  await voucherController.addNewVoucher(body);
  res.redirect("/voucher");
});

// DELETE Voucher
router.delete("/:id", async function (req, res, next) {
  const {params} = req;
  await voucherController.remove((params.id));
  res.send({ result: true });
});

/* GET prod by id page. */
//checkLogin.check,
router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let voucher = await voucherController.getVoucherById(id);
  res.render("./voucher/editVoucher", { voucher : voucher , title:"Edit Voucher" });
});
// /* POST Edit product. checklogin.check,  */
router.post("/edit/:id", middleAddVoucher, async function (req, res, next) {
  let {params,body,file} = req;
  let id = req.params.id;
  let date = moment(body.date + " " + body.time);
  body = { ...body, expiredTime: date.utcOffset("+0700").toDate().getTime() };
  if(file){
    const image = 'http://10.82.181.249:3000/images/' + file.filename;
    body = {...body,image}
  }
  await voucherController.updateVoucher(body, id);
  res.redirect("/voucher");
});

//search
router.get("/search/:value", async function (req, res, next) {
  let key = req.params.value;
  let voucherList = await voucherController.search(key);
  res.render("./voucher/voucher", { voucherList });
});
module.exports = router;
