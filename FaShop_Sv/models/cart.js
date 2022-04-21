const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  id: { type: ObjectId,required:true , unique:false},
  image: { type: String },
  name: { type: String },
  quantity:{type: Number},
  email:{type: String},
  price:{type: Number},
});
module.exports = mongoose.model("Cart", orderSchema);
