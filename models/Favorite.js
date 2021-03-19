import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const favoriteListSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        _id: false,
        type: _Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavoriteList = model('FavoriteList', favoriteListSchema);

export default FavoriteList;
