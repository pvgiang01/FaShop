const mongoose = require('mongoose'); 
var otpSchema = new mongoose.Schema({
    otp:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    exprire:{
        type: Number
    }
});

module.exports = mongoose.model('otp', otpSchema);