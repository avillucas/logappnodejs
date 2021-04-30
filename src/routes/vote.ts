import {Router} from 'express';
import VoteController from '../controller/VoteController';
import {checkJwt} from '../midlewares/jtw';
import {checkRole} from '../midlewares/role';
import config from '../config/config';

const router = Router();
//new
router.post('/', [checkJwt], VoteController.new);

export default router;