import moment from 'moment';
import { ObjectId } from 'mongoose';
import ProductModel from '../model/product.model';
import { productPayloadType } from '../interface';
import { responseHandlers } from '../helpers/handlers';
import UserModel, { CartType } from '../model/user.model';

const getAllProducts = () => {
  return ProductModel.find({})
    .select(responseHandlers.productResponseFields)
    .populate('userId');
};

const getAllProduct = (_id: string) => {
  return ProductModel.findOne({ _id })
    .select(responseHandlers.productResponseFields)
    .populate('userId');
};

const createProduct = async (productPayload: productPayloadType) => {
  return ProductModel.create({
    title: productPayload.title,
    price: productPayload.price,
    description: productPayload.description,
    imageUrl: productPayload.imageUrl,
    userId: productPayload.userId,
    createdAt: moment(),
  });
};

const updateProduct = async (productPayload: productPayloadType) => {
  return ProductModel.updateOne(
    { _id: productPayload._id },
    {
      title: productPayload.title,
      price: productPayload.price,
      description: productPayload.description,
      imageUrl: productPayload.imageUrl,
    }
  );
};

const deleteProduct = async (_id: string) => {
  return ProductModel.deleteOne({ _id });
};

const getProductById = async (_id: string) => {
  return ProductModel.findOne({ _id });
};

const incrementCartCount = async (userId: ObjectId, productId: ObjectId) => {
  return UserModel.updateOne(
    {
      _id: userId,
      'cart.productId': productId,
    },
    { $inc: { 'cart.$.quantity': 1 } }
  );
};

const checkItemExistInCart = async (userId: ObjectId, productId: ObjectId) => {
  return UserModel.findOne({
    _id: userId,
    'cart.productId': productId,
  });
};

const addItemToCart = async (userId: ObjectId, cartItem: CartType) => {
  return UserModel.updateOne(
    { _id: userId },
    {
      $push: {
        cart: cartItem,
      },
    }
  );
};

const decrementCartCount = async (userId: ObjectId, productId: ObjectId) => {
  return UserModel.updateOne(
    {
      _id: userId,
      'cart.productId': productId,
    },
    { $inc: { 'cart.$.quantity': -1 } }
  );
};

const removeCartIfQntyZero = async (userId: ObjectId) => {
  return UserModel.updateOne(
    { _id: userId },
    {
      $pull: {
        cart: {
          quantity: {
            $lte: 0,
          },
        },
      },
    }
  );
};

const removeAllItemsFromCart = async (userId: ObjectId) => {
  return UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        cart: [],
      },
    }
  );
};

export {
  getAllProducts,
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  incrementCartCount,
  checkItemExistInCart,
  addItemToCart,
  decrementCartCount,
  removeCartIfQntyZero,
  removeAllItemsFromCart,
};
