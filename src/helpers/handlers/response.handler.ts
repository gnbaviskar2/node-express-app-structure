// import { productPayloadType } from '../../interface';
import { productModelObj } from '../../model';

const responseProductData = (doc: productModelObj.ProductModelType) => {
  return {
    _id: doc._id,
    title: doc.title,
    price: doc.price,
    description: doc.description,
    imageUrl: doc.imageUrl,
  };
};

export { responseProductData };
