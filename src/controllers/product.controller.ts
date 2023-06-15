import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { productRepo } from '../repos';
import { productPayloadType } from '../interface';
import { httpCodes } from '../core/constants';
import { productValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';

const getAllProducts = async (req: Request, res: Response) => {
  const products = productRepo.getAllProducts();
  return res.json(products);
};

const getAllProduct = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params._id)) {
    console.log('invalid id');
    throw new Error('invalid id');
  }

  const product = await productRepo.getAllProduct(req.params._id);
  if (!product) {
    res.json('no product with the id');
  }
  return res.json(product);
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

const updateProduct = async (req: Request, res: Response) => {
  const productPayload: productPayloadType = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    _id: req.body._id,
  };
  const isValidInput = productValidators.validateUpdateProduct(productPayload);
  if (isValidInput.error) {
    // TODO: remove after error handling
    console.log(`validation error: ${isValidInput.error.message}`);
    throw new Error(isValidInput.error.message);
  }
  const product = await productRepo.updateProduct(productPayload);
  return res
    .status(httpCodes.OK)
    .json(responseHandlers.responseProductData(productPayload));
};

const deleteProduct = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params._id)) {
    console.log('invalid id');
    throw new Error('invalid id');
  }
  const deleteRes = await productRepo.deleteProduct(req.params._id);
  if (deleteRes.deletedCount) {
    return res.status(httpCodes.OK).json('OK');
  }
  return res.status(httpCodes.OK).json('something is wrong');
};
export {
  getAllProducts,
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
