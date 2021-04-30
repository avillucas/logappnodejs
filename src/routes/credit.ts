import {Router} from 'express';
import ChargesController from '../controller/ChargesController';
import {checkJwt} from '../midlewares/jtw';

const router = Router();
//new
router.post('/', [checkJwt], ChargesController.new);

export default router;