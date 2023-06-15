import { Router } from 'express';
import productRoutes from './product.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/product', productRoutes);
router.use('/user', userRoutes);

export default router;
