import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const providerSchema = new Schema({
  name:{
    type:String,
    required:true
  }
},{timestamps:true});
const Provider = model('provider', providerSchema);
export default Provider;
