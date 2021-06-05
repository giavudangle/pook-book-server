import { Schema as _Schema, model, Types } from 'mongoose';
const Schema = _Schema;

const reviewSchema = new Schema({
  content :{
    type:String,
    required:true,
  },
  product : {
    type:Types.ObjectId,
    ref:'product',
    required:true
  },
  user : {
    type:Types.ObjectId,
    ref:'user',
    required:true
  }
},{timestamps:true});
const Review = model('review', reviewSchema);
export default Review;
