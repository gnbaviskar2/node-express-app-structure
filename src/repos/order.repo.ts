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

export { createOrder };
