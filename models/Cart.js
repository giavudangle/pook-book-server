import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      _id: false,
      item: {
        type: _Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
});
const Cart = model('cart', cartSchema);
export default Cart;
