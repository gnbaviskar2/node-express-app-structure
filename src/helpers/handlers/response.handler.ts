import _ from 'lodash';
import { productModelObj } from '../../model';
import { productPayloadType } from '../../interface';

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

export { responseProductData, productResponseFields };
