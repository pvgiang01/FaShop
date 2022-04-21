const adminModel = require('../models/admin');

exports.getAll = async (email) => {
    let arr = await adminModel.find({email: {$ne: email}});
    return arr;
}

exports.createAdmin = async (email, password) => {
    let admin = new adminModel({
        email: email,
        password: password,
        role: 0
    });

    admin.save(err => {
        if(err){
            console.log('create admin account fail!', err);
        }else{
            console.log('create admin account success!');
        }
    })
}

exports.getUserByEmail = async (email) => {
    let user = await adminModel.findOne({email: email});
    return user;
}

exports.updatePassword = (email, new_password) => {
    adminModel.findOneAndUpdate({email: email}, {password: new_password});
}

exports.updateRole = (email, role) => {
    adminModel.findOneAndUpdate({email: email}, {role: role});
}

exports.deleteAdmin = async (email) => {
    await adminModel.findOneAndDelete({email: email});
}