import mongoose, { Schema } from 'mongoose';

interface Cart extends Document {
  productId: string;
  quantity: number;
}

export interface UserModelType extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  cart: [Cart];
}

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.model<UserModelType>('User', userSchema);
export default UserModel;
