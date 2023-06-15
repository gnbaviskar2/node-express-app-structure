import { Router } from 'express';
import { userController } from '../../controllers';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:_id', userController.getUser);
router.post('/signup', userController.createUser);
router.delete('/:_id', userController.deleteUser);
router.post('/login', userController.loginUser);

export default router;
