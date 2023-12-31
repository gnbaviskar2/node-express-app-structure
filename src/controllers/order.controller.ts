import { Response } from 'express';
import { ProtectedRequest } from '../types/app-request';
import { httpCodes } from '../core/constants';
import { responseHandlers } from '../helpers/handlers';
import AppError, { HttpCodeEnum } from '../helpers/handlers/api.error.handler';
import { productRepo, userRepo, orderRepo } from '../repos';
import { CartType, UserModelType } from '../model/user.model';
import { OrderProductType, OrderUserType } from '../model/order.model';
import asyncHandler from '../helpers/handlers/async.handler';
import { ProductModelType } from '../model/product.model';

const createOrder = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    if (req.user?.cart.length <= 0) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: 'No item found in cart',
      });
    }

    // populate user to add product objects in user.cart
    const user = (await userRepo.getUser(req.user._id)) as UserModelType;

    const products: OrderProductType[] = []; // prepare products arr

    user.cart.map((cart: CartType) => {
      const addProduct = {
        product: cart.productId as ProductModelType, // productId is populated Product obj
        quantity: cart.quantity,
      } as OrderProductType;
      return products.push(addProduct);
    });

    const order = await orderRepo.createOrder(products, {
      name: `${req.user.firstname} ${req.user.lastname}`,
      userId: req.user._id,
    } as OrderUserType);

    await productRepo.removeAllItemsFromCart(req.user._id);
    req.user = await userRepo.getUser(req.user._id);
    responseHandlers.apiResponse(
      res,
      httpCodes.CREATED,
      order,
      'Order received!'
    );
  }
);

const deleteOrder = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    if (!req.body._id) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: 'order id is required',
      });
    }

    const orderRes = await orderRepo.removeOrderById(req.body._id);

    responseHandlers.apiResponse(res, httpCodes.OK, orderRes, 'Order deleted!');
  }
);

const getOrdersByUserId = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const userId = req.user?._id;

    const orders = await orderRepo.getOrdersByUserId(userId);

    responseHandlers.apiResponse(res, httpCodes.OK, orders, 'Order deleted!');
  }
);

export { createOrder, deleteOrder, getOrdersByUserId };
