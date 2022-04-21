const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const voucherSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  code: { type: String },
  value: { type: Number },
  expiredTime: { type: Number, default: new Date().getTime() },
  description: { type: String, default: "" },
  image: { type: String },
});
module.exports = mongoose.model("Voucher", voucherSchema);
