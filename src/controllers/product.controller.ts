import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import asyncHandler from '../helpers/handlers/async.handler';
import { productRepo, userRepo } from '../repos';
import { productPayloadType } from '../interface';
import { httpCodes } from '../core/constants';
import { productValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';
import { ProtectedRequest } from '../types/app-request';
import AppError, { HttpCodeEnum } from '../helpers/handlers/api.error.handler';
import { CartType } from '../model/user.model';

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productRepo.getAllProducts();
  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    {
      products,
    },
    'Products found'
  );
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
  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    product,
    'Product found'
  );
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
    return responseHandlers.apiResponse(
      res,
      httpCodes.CREATED,
      responseHandlers.responseProductData(product),
      'Product created'
    );
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
    const updateRes = await productRepo.updateProduct(productPayload);
    if (updateRes) {
      return responseHandlers.apiResponse(
        res,
        httpCodes.OK,
        responseHandlers.responseProductData(productPayload),
        'Product updated'
      );
    }
    throw new AppError({
      httpCode: HttpCodeEnum.INTERNAL_SERVER_ERROR,
      description: 'Could not update',
    });
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
    return responseHandlers.apiResponse(
      res,
      httpCodes.OK,
      deleteRes,
      'Product deleted'
    );
  }
  throw new AppError({
    httpCode: HttpCodeEnum.INTERNAL_SERVER_ERROR,
    description: 'Could not delete',
  });
});

const addToCart = asyncHandler(async (req: ProtectedRequest, res: Response) => {
  if (!req.body._id) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: 'product id required',
    });
  }
  const product = await productRepo.getProductById(req.body._id);
  if (!product) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: `No product found for the id: ${req.body._id}`,
    });
  }

  await req.user.addToCart(product._id.toString());
  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    req.user,
    'Added to Cart'
  );
});

const addToCart2 = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    if (!req.body._id) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: 'product id required',
      });
    }
    const product = await productRepo.getProductById(req.body._id);
    if (!product) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: `No product found for the id: ${req.body._id}`,
      });
    }

    const isProductExistsInCart = await productRepo.checkItemExistInCart(
      req.user._id,
      product._id
    );
    if (isProductExistsInCart) {
      await productRepo.incrementCartCount(req.user._id, product._id);
    } else {
      const cartItem = {
        productId: product._id.toString(),
        quantity: 1,
      } as CartType;
      await productRepo.addItemToCart(req.user._id, cartItem);
    }
    req.user = await userRepo.getUser(req.user._id);
    return responseHandlers.apiResponse(
      res,
      httpCodes.OK,
      req.user,
      'Added to Cart'
    );
  }
);

const removeFromCart = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    if (!req.body._id) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: 'product id required',
      });
    }
    const product = await productRepo.getProductById(req.body._id);
    if (!product) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: `No product found for the id: ${req.body._id}`,
      });
    }

    const isProductExistsInCart = await productRepo.checkItemExistInCart(
      req.user._id,
      product._id
    );
    if (!isProductExistsInCart) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: `Item does not exist in cart with product id: ${req.body._id}`,
      });
    }

    await productRepo.decrementCartCount(req.user._id, product._id);
    await productRepo.removeCartIfQntyZero(req.user._id);
    req.user = await userRepo.getUser(req.user._id);
    return responseHandlers.apiResponse(
      res,
      httpCodes.OK,
      req.user,
      'Removed to Cart'
    );
  }
);

export {
  getAllProducts,
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  addToCart2,
  removeFromCart,
};
