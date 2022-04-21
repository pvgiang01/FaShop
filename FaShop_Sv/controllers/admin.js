const adminService = require('../services/admin');

exports.getAll = async (email) => {
    let arr = await adminService.getAll(email);
    console.log(arr)
    return arr;
}

exports.getUserByEmail = async (email) => {
    let user = await adminService.getUserByEmail(email);
    return user;
}

exports.createAdmin = async (email, password) => {
    await adminService.createAdmin(email, password);
}

exports.updatePassword = (email, new_password) => {
    adminService.updatePassword(email, new_password);
}

exports.updateRole = (email, role) => {
    adminService.updateRole(email, role);
}

exports.deleteAdmin = async (email) => {
    await adminService.deleteAdmin(email)
}