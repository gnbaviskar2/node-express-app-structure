import { ObjectId } from 'mongoose';
import OrderModel, {
  OrderProductType,
  OrderUserType,
} from '../model/order.model';

const createOrder = (products: OrderProductType[], user: OrderUserType) => {
  return OrderModel.create({
    products,
    user,
  });
};

const getOrderById = (_id: ObjectId) => {
  return OrderModel.findOne({
    _id,
  });
};

const removeOrderById = (_id: ObjectId) => {
  return OrderModel.deleteOne({
    _id,
  });
};

const getOrdersByUserId = (_id: ObjectId) => {
  return OrderModel.find({
    'user.userId': _id,
  })
    .populate({
      path: 'user.userId',
      model: 'User',
    })
    .populate({
      path: 'products.product',
      model: 'Product',
    });
};

export { createOrder, getOrderById, removeOrderById, getOrdersByUserId };
