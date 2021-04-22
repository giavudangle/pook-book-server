import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const productSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,     
    },
    price: {
      type: Number,
      required: true,
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
    author:{
      type:Schema.Types.ObjectId,
      ref:'author',
      required:true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref:'category',
      required: true,
    },
    provider:{
      type: Schema.Types.ObjectId,
      ref:'provider',
      required:true
    },
    publisher:{
      type: Schema.Types.ObjectId,
      ref:'publisher',
      required:true
    },
    stocks :{
      type: Number,
      required:true,
      default:0,
      validate:{
        validator: function(s) {
          return parseInt(s) >=0
        },
        message:'Stock of product must be greater than zero'
      },
    }
  },
  { timestamps: true }
);
const Product = model('product', productSchema);

export default Product;
