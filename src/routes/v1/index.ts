import { Router } from 'express';
import productRoutes from './product.routes';
import userRoutes from './user.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);

export default router;
