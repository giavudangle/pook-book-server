import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // enum: 10,
    default: '',
  },
  address: {
    type: String,
    // minlength: 6,
    default: '',
  },
  profilePicture: {
    type: String,
  },
  pushTokens: {
    // push tokens is array of EXPO PUSH NOTIFICATION TOKENS
    type: Array,
    required: true,
  }
},{timestamps:true});

const User = model('user', userSchema);
export default User;
