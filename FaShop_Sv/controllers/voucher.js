var voucherServices = require('../services/voucher');

exports.getListVouchers = async function getListVouchers() {
    return await voucherServices.getListVouchers();
}

exports.addNewVoucher = async function addNewVoucher(body) {
    let { name, code, value, expiredTime, description, image } = body;
    let newVoucher = {
        name: name,
        code: code,
        value: value,
        expiredTime: expiredTime,
        description: description, 
        image: image
    };
    return await voucherServices.addNewVoucher(newVoucher);
}

exports.remove = async function removeVoucher(id) {
    await voucherServices.remove(id);
}
exports.getVoucherById = async function getVoucherById(id) {
    return await voucherServices.getVoucherById(id);
}

exports.updateVoucher = async (body, id) => {
    let { name, value, expiredTime, description, code, image } = body;
    let editVoucher = { id, name, value, expiredTime, description, code,image };
    return await voucherServices.updateVoucher(editVoucher);
}

exports.search = async function (keyword) {
    return await voucherServices.search(keyword);
};

exports.getVoucherByCode = async function (code) {
    return await voucherServices.getVoucherByCode(code);
}
