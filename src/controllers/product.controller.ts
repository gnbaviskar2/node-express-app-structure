import { Response, Request } from 'express';
import { productRepo } from '../repos';
import { productPayloadType } from '../interface';
import { httpCodes } from '../core/constants';
import { productValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productRepo.getAllProducts();
  return res.json(products);
};

const createProduct = async (req: Request, res: Response) => {
  const productPayload: productPayloadType = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
  };
  const isValidInput = productValidators.validateCreateProduct(productPayload);
  if (isValidInput.error) {
    // TODO: remove after error handling
    console.log(`validation error: ${isValidInput.error.message}`);
    throw new Error(isValidInput.error.message);
  }
  const product = await productRepo.createProduct(productPayload);
  return res
    .status(httpCodes.CREATED)
    .json(responseHandlers.responseProductData(product));
};

export { getAllProducts, createProduct };
