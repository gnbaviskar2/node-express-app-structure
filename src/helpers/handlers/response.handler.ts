import _ from 'lodash';
import { productModelObj, userModelObj } from '../../model';
import { productPayloadType, userPayloadType } from '../../interface';

// cannot mix 1 and 0 except for _id
const productResponseFields = {
  // adding and removing fields here will also affect other product method response
  _id: 1,
  title: 1,
  price: 1,
  description: 1,
  imageUrl: 1,
};

const responseProductData = (
  doc: productModelObj.ProductModelType | productPayloadType
) => {
  return {
    _id: productResponseFields._id === 1 ? doc._id : undefined,
    title: _.has(productResponseFields, 'title') ? doc.title : undefined,
    price: _.has(productResponseFields, 'price') ? doc.price : undefined,
    description: _.has(productResponseFields, 'description')
      ? doc.description
      : undefined,
    imageUrl: _.has(productResponseFields, 'imageUrl')
      ? doc.imageUrl
      : undefined,
  };
};

// cannot mix 1 and 0 except for _id
const userResponseFields = {
  // adding and removing fields here will also affect other product method response
  _id: 1,
  firstname: 1,
  lastname: 1,
  username: 1,
  email: 1,
  cart: 1,
};

const responseUserData = (
  doc: userModelObj.UserModelType | userPayloadType
) => {
  return {
    _id: userResponseFields._id === 1 ? doc._id : undefined,
    firstname: _.has(userResponseFields, 'firstname')
      ? doc.firstname
      : undefined,
    lastname: _.has(userResponseFields, 'lastname') ? doc.lastname : undefined,
    username: _.has(userResponseFields, 'username') ? doc.username : undefined,
    email: _.has(userResponseFields, 'email') ? doc.email : undefined,
    cart: _.has(userResponseFields, 'cart') ? doc.cart : undefined,
  };
};

export {
  responseProductData,
  productResponseFields,
  responseUserData,
  userResponseFields,
};
