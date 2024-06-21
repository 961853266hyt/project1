const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  belongTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      number: { type: Number, required: true, default: 1 },
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;