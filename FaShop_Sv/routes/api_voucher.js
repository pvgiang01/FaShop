var express = require('express');
var router = express.Router();
const voucherController = require('../controllers/voucher');

router.get("/voucher", async function (req, res, next) {
  let listVoucher = await voucherController.getListVouchers();
  res.json(listVoucher);
});
router.post("/get-voucher", async function (req, res, next) {
  const { code } = req.body;
  let c = await voucherController.getVoucherByCode(code);
  console.log(c);
  let currentDate = Date.now();
  if (c) {
    if (c.expiredTime < currentDate) {
      return res.json({ success: false, msg: "Voucher đã hết hạn" });
    } else {
      return res.json({ value: c.value, success: true });
    }
  } else {
    return res.json({ success: false, msg: "Voucher không tồn tại" });
  }
});
module.exports = router;