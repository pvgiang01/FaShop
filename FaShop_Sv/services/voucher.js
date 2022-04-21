var voucherModel = require('../models/voucher');

exports.getListVouchers = async function getListVouchers() {
  let listVoucher = await voucherModel.find();
  return listVoucher;
}
exports.addNewVoucher = async function addNewVoucher(Voucher) {
  const newVoucher = new voucherModel(Voucher);
  return await newVoucher.save();
}

exports.remove = async function removeVoucher(id) {
  await voucherModel.remove({ _id: id });
}

exports.getVoucherById = async function getVoucherById(id) {
  return await voucherModel.findById(id);
}

exports.updateVoucher = async (voucher) => {
  let v = await voucherModel.findById(voucher.id);
  if (v) {
    v.name = voucher.name;
    v.code = voucher.code;
    v.value = voucher.value;
    v.expiredTime = voucher.expiredTime;
    v.description = voucher.description;
    if (voucher.image) {
      v.image = voucher.image;
    }
  }
  return await v.save();
}
// search
exports.search = async function (keyword) {
  let temp = await voucherModel.find();
  if (keyword == "false") {
    return temp;
  }
  return await temp.filter((s) =>
    s.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

exports.getVoucherByCode = async function (code) {
  return await voucherModel.findOne({code : code});
}