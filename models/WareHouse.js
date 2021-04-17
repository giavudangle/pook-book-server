import { Schema as _Schema, model, SchemaTypes } from 'mongoose';
const Schema = _Schema;

const wareHouseSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'product',
    unique:true,
  },
  stock :{
    type:Number,
    required:true,
    validate:{
      validator: function(s) {
        return parseInt(s) >=0
      },
      message:'Stock of product must be greater than zero'
    },
    default:0
  }
},{timestamps:true});




const WareHouse = model('wareHouse', wareHouseSchema);
export default WareHouse;
