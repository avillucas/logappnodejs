import {Router} from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../midlewares/jtw';

const router = Router();
//login
router.post('/login',AuthController.login);
//registro
router.post('/register',AuthController.register);
//rforgot
router.post('/reset',[checkJwt],AuthController.changePassword);

export default router;