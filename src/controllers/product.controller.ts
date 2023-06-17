import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import asyncHandler from '../helpers/handlers/async.handler';
import { productRepo } from '../repos';
import { productPayloadType } from '../interface';
import { httpCodes } from '../core/constants';
import { productValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';
import { ProtectedRequest } from '../types/app-request';
import AppError, { HttpCodeEnum } from '../helpers/handlers/api.error.handler';

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productRepo.getAllProducts();
  res.json(products);
});

const getAllProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params._id)) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: 'Invalid id',
    });
  }

  const product = await productRepo.getAllProduct(req.params._id);
  if (!product) {
    throw new AppError({
      httpCode: HttpCodeEnum.OK,
      description: 'No products found',
    });
  }
  res.json(product);
});

const createProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const productPayload: productPayloadType = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.user._id,
    };

    const isValidInput =
      productValidators.validateCreateProduct(productPayload);
    if (isValidInput.error) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: isValidInput.error.message,
      });
    }
    const product = await productRepo.createProduct(productPayload);
    res
      .status(httpCodes.CREATED)
      .json(responseHandlers.responseProductData(product));
  }
);

const updateProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const productPayload: productPayloadType = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      _id: req.body._id,
      userId: req.user._id,
    };
    const isValidInput =
      productValidators.validateUpdateProduct(productPayload);
    if (isValidInput.error) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: isValidInput.error.message,
      });
    }
    const product = await productRepo.updateProduct(productPayload);
    if (product.modifiedCount === 0) {
      throw new AppError({
        httpCode: HttpCodeEnum.INTERNAL_SERVER_ERROR,
        description: 'Could not update',
      });
    }

    res
      .status(httpCodes.OK)
      .json(responseHandlers.responseProductData(productPayload));
  }
);

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params._id)) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: 'Invalid Id',
    });
  }
  const deleteRes = await productRepo.deleteProduct(req.params._id);
  if (deleteRes.deletedCount) {
    res.status(httpCodes.OK).json('OK');
  }
  throw new AppError({
    httpCode: HttpCodeEnum.INTERNAL_SERVER_ERROR,
    description: 'Could not delete',
  });
});
export {
  getAllProducts,
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
