const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  id: { type: ObjectId },
  products: { type: Object },
  order_id: { type: ObjectId },
  address:{type: String},
});
module.exports = mongoose.model("OrderDetail", orderSchema);
