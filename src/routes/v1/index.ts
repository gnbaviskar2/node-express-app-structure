import { Router } from 'express';
import productRoutes from './product.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);

export default router;
