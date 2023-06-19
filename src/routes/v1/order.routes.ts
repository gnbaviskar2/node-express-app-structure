import express from 'express';
import { orderController } from '../../controllers';
import authentication from '../../helpers/middlewares/authentication.middleware';

const router = express.Router();

router.post('/', authentication, orderController.createOrder);

export default router;
