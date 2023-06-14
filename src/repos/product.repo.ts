import { productModelObj } from '../model';
import { productPayloadType } from '../interface';
import { responseHandlers } from '../helpers/handlers';

const getAllProducts = () => {
  return productModelObj.ProductModel.find({}).select(
    responseHandlers.productResponseFields
  );
};

const getAllProduct = (_id: string) => {
  return productModelObj.ProductModel.findOne({ _id }).select(
    responseHandlers.productResponseFields
  );
};

const createProduct = async (productPayload: productPayloadType) => {
  return productModelObj.ProductModel.create({
    title: productPayload.title,
    price: productPayload.price,
    description: productPayload.description,
    imageUrl: productPayload.imageUrl,
  });
};

export { getAllProducts, getAllProduct, createProduct };
