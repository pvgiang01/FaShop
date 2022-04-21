const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: { type: String,default:""},
    phone: { type: String,default:"" },
    address: { type: String,default:"" },
    image: { type: String,default:"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" },
    email: { type: String },
    password: { type: String },
    active: {type: Boolean, default:true},
});
module.exports = mongoose.model('User', userSchema);