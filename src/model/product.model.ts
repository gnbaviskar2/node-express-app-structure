import mongoose, { Schema } from 'mongoose';

export interface ProductModelType extends Document {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const productModel = new Schema({
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
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model<ProductModelType>('Product', productModel);

export default ProductModel;
