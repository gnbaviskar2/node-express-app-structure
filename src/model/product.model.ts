import mongoose, { Schema } from 'mongoose';

export interface ProductModelType extends Document {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: string;
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model<ProductModelType>('Product', productSchema);

export default ProductModel;
