import mongoose, { ObjectId, Schema } from 'mongoose';
import { ProductModelType } from './product.model';

export interface OrderProductType extends Document {
  product: ProductModelType;
  quantity: number;
}

export interface OrderUserType extends Document {
  name: string;
  userId: number;
}

export interface OrderModelType extends Document {
  _id: ObjectId;
  products: [OrderProductType];
  user: OrderUserType;
}

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
