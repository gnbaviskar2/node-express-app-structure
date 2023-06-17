import joi from 'joi';

import { productPayloadType } from '../../interface';

const validateSingleGetProduct = (_id: string) => {
  const singleGetProductData = joi.object({
    _id: joi.string().length(24),
  });
  return singleGetProductData.validate({
    _id,
  });
};

export const joiObjectId = (message = 'valid id') =>
  joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

const validateCreateProduct = (productPayload: productPayloadType) => {
  const productData = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    imageUrl: joi.string().required(),
    userId: joi.any().required(),
  });
  return productData.validate(productPayload);
};

const validateUpdateProduct = (productPayload: productPayloadType) => {
  const productData = joi.object({
    _id: joi.string().required(),
    title: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    imageUrl: joi.string().required(),
    userId: joi.any().required(),
  });
  return productData.validate(productPayload);
};

export {
  validateCreateProduct,
  validateSingleGetProduct,
  validateUpdateProduct,
};
