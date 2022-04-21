const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String },
    description: { type: String },
    published: { type: Date },
    available: {type: Boolean, default:true},
});
module.exports = mongoose.model('Product', productSchema);