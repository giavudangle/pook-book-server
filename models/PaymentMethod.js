import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const paymentMethodSchema = new Schema({
  name:{
    type:String,
    required:true,
    default:'Cash On Delievery' // MasterCard , Momo blah blah
  },
  code : {
    type:String,
    required:true,
    default:'COD' // Ex : VISA -> VISA, MasterCard -> MC , Cash On Delivery -> COD
  }
},{timestamps:true});
const PaymentMethod = model('PaymentMethod', paymentMethodSchema);
export default PaymentMethod;
