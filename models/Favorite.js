import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const favoriteSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        _id: false,
        item: {
          type: _Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Favorite = model('favorite', favoriteSchema);

export default Favorite;

