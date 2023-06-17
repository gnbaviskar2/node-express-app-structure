import { Router } from 'express';
import { productController } from '../../controllers';
import authentication from '../../helpers/middlewares/authentication';

const router = Router();

router.get('/', authentication, productController.getAllProducts);
router.get('/:_id', authentication, productController.getAllProduct);
router.post('/', authentication, productController.createProduct);
router.put('/', authentication, productController.updateProduct);
router.delete('/:_id', authentication, productController.deleteProduct);

export default router;
