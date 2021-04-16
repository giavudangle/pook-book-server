import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const categorySchema = new Schema({
  name:{
    type:String,
    required:true
  },
  code : {
    type:String,
    default:''
  }
},{timestamps:true});
const Category = model('category', categorySchema);
export default Category;
