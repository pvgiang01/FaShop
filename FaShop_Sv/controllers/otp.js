const otpService = require('../services/otp');

exports.getOTP = async (email) => {
    return await otpService.getOTP(email);
}

exports.generateOTP = async (email) => {
    return otpService.generateOTP(email);
}

exports.resetOTP = async (email) => {
    otpService.resetOTP(email);
}