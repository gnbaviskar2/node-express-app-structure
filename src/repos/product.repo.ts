import moment from 'moment';
import ProductModel from '../model/product.model';
import { productPayloadType } from '../interface';
import { responseHandlers } from '../helpers/handlers';

const getAllProducts = () => {
  return ProductModel.find({})
    .select(responseHandlers.productResponseFields)
    .populate('userId');
};

const getAllProduct = (_id: string) => {
  return ProductModel.findOne({ _id }).select(
    responseHandlers.productResponseFields
  );
};

const createProduct = async (productPayload: productPayloadType) => {
  return ProductModel.create({
    title: productPayload.title,
    price: productPayload.price,
    description: productPayload.description,
    imageUrl: productPayload.imageUrl,
    userId: productPayload.userId,
    createdAt: moment(),
  });
};

const updateProduct = async (productPayload: productPayloadType) => {
  return ProductModel.updateOne(
    { _id: productPayload._id },
    {
      title: productPayload.title,
      price: productPayload.price,
      description: productPayload.description,
      imageUrl: productPayload.imageUrl,
    }
  );
};

const deleteProduct = async (_id: string) => {
  return ProductModel.deleteOne({ _id });
};

export {
  getAllProducts,
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
