import { Router } from 'express';

import { productController } from '../../controllers';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:_id', productController.getAllProduct);
router.post('/', productController.createProduct);
router.put('/', productController.updateProduct);
router.delete('/:_id', productController.deleteProduct);

export default router;
