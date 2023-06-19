import mongoose, { ObjectId, Schema } from 'mongoose';
import _ from 'lodash';
import { ProductModelType } from './product.model';

export interface CartType extends Document {
  productId: string | ProductModelType;
  quantity: number;
}

export interface UserModelType extends Document {
  _id: ObjectId;
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
          unique: true,
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

// following method is not being used
userSchema.method('addToCart', function (productId: string) {
  this.depopulate(); // this will remove the effect of populated cart
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

// following method is not being used
userSchema.method('removeFromCartIfQuantityZero', async function () {
  this.depopulate(); // this will remove the effect of populated cart
  let cartItems: CartType[] = this.cart;
  cartItems = _.filter(cartItems, (cart: CartType) => {
    return cart.quantity > 0;
  });
  this.cart = cartItems;
  await this.save();
});

const UserModel = mongoose.model<UserModelType>('User', userSchema);
export default UserModel;
