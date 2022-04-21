const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  id: { type: ObjectId },
  createdTime: { type: Number, default: new Date().getTime },
  status: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  list: { type: Object },
});
module.exports = mongoose.model("Order", orderSchema);
