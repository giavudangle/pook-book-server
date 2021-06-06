import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const promotionSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  code : {
    type:String,
    default:''
  },
  value: {
    type:Number,
    required:true
  },
  imageUrl:{
    type:String,
    default:''
  },
  expiredAt : {
    type:Date,
    required:true
  }
},{timestamps:true});
const Promotion = model('promotion', promotionSchema);
export default Promotion;
