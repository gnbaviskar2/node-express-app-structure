import joi from 'joi';
import { productPayloadType } from '../../interface';

const validateCreateProduct = (productPayload: productPayloadType) => {
  const productData = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    imageUrl: joi.string().required(),
  });
  return productData.validate(productPayload);
};

export { validateCreateProduct };
