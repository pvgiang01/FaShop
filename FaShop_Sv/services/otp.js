const otpModel = require('../models/otp');
const moment = require('moment');

exports.getOTP = async (email) => {
    return await otpModel.findOne({email: email});
}

exports.generateOTP = async (email) => {
    let otp = Math.floor(Math.random() * 900000) + 100000;
    let o = await otpModel.findOne({email: email});
    if(o){
        let exprireTime = moment(new Date().getTime()).add(3, 'minute').toDate().getTime();
        await otpModel.findOneAndUpdate({email: email}, {$set: {otp: otp.toString(), exprire: exprireTime}});
    }else{
        const otpData = new otpModel({
            email: email,
            otp: otp.toString(),
            exprire: new Date().getTime()
        })

        await otpData.save();
    }
    return otp;
}

exports.resetOTP = async (email) => {
    await otpModel.findOneAndUpdate({email: email}, {exprire: new Date().getTime()});
}