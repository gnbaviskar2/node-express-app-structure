import { Router } from 'express';

import { productController } from '../../controllers';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:_id', productController.getAllProduct);
router.post('/', productController.createProduct);

export default router;
