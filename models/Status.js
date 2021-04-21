import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const statusSchema = new Schema({
  name:{
    type:String,
    required:true,
    default:'Waitting'
  },
  code : {
    type:String,
    required:true,
    default:'WT', // Ex : Delivery -> DV , Shipping -> SP ,Waitting -> WT
  }
},{timestamps:true});
const Status = model('Status', statusSchema);
export default Status;
