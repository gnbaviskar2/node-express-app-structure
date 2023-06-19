import express from 'express';
import { orderController } from '../../controllers';
import authentication from '../../helpers/middlewares/authentication.middleware';

const router = express.Router();

router.post('/', authentication, orderController.createOrder);
router.delete('/', authentication, orderController.deleteOrder);
router.get('/', authentication, orderController.getOrdersByUserId);

export default router;
