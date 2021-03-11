import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const productSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    title: {
      type: String,     
    },
    color: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    standard: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
    thumb: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Product = model('product', productSchema);

export default Product;
