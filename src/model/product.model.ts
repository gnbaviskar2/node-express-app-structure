import mongoose, { Schema } from 'mongoose';

export interface ProductModelType extends Document {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
    lowercase: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
    lowercase: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model<ProductModelType>('Product', productSchema);

export default ProductModel;
