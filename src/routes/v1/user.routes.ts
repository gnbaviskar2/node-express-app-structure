import { Router } from 'express';
import { userController } from '../../controllers';
import authentication from '../../helpers/middlewares/authentication.middleware';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', authentication, userController.getUsers);
router.get('/:_id', authentication, userController.getUser);

router.delete('/:_id', authentication, userController.deleteUser);

export default router;
