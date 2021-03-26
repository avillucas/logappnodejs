import {Router} from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../midlewares/jtw';

const router = Router();
router.post('/login',AuthController.login);

router.post('/reset',[checkJwt],AuthController.changePassword);

export default router;