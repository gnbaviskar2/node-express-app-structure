import { Router } from 'express';
import { productController } from '../../controllers';
import authentication from '../../helpers/middlewares/authentication.middleware';

const router = Router();

router.post('/', authentication, productController.addToCart2);

export default router;
