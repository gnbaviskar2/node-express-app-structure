// import moment from 'moment';
import { productModelObj } from '../model';
import { productPayloadType } from '../interface';

const getAllProducts = () => {
  return productModelObj.ProductModel.find({});
};

const createProduct = async (productPayload: productPayloadType) => {
  return productModelObj.ProductModel.create({
    title: productPayload.title,
    price: productPayload.price,
    description: productPayload.description,
    imageUrl: productPayload.imageUrl,
  });
};

export { getAllProducts, createProduct };
