import { Schema as _Schema, model, Types } from "mongoose";
const Schema = _Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: _Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    items: [
      {
        _id: false,
        item: {
          type: _Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    name: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMethod: {
     type:Types.ObjectId,
      ref:'PaymentMethod',
      required: true,
    },
    status: {
      //waiting, confirmed, delivery, success
      type: Types.ObjectId,
      ref:'Status', 
      default: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
