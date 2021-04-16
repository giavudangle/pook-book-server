import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const publisherSchema = new Schema({
  name:{
    type:String,
    required:true
  }
},{timestamps:true});
const Publisher = model('publisher', publisherSchema);
export default Publisher;
