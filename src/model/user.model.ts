import mongoose, { ObjectId, Schema } from 'mongoose';
import _ from 'lodash';

interface CartType extends Document {
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
  cart: [CartType];
  readEmail: (product: string) => void;
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

userSchema.method('addToCart', function (productId: string) {
  const prodIndex = _.findIndex(this.cart, (thisCart: CartType) => {
    // console.log(
    //   `this card id: ${thisCart.productId.toString} received: ${productId}`
    // );
    return thisCart.productId.toString() === productId;
  });

  if (prodIndex >= 0) {
    this.cart[prodIndex].quantity += 1;
  } else {
    const newCartItem = {
      productId,
      quantity: 1,
    } as CartType;
    this.cart.push(newCartItem);
  }
  this.save();
});

const UserModel = mongoose.model<UserModelType>('User', userSchema);
export default UserModel;
