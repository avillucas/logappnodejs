import {Router} from 'express';
import PhotosController from '../controller/PhotosController';
import {checkJwt} from '../midlewares/jtw';
import {checkRole} from '../midlewares/role';
import config from '../config/config';

const router = Router();
//get photos not owned by the user
router.get('/:userId/:page', [checkJwt, checkRole([config.Roles.admin])], PhotosController.getnotUserList);
//Create new photo
router.post('/', [checkJwt, checkRole([config.Roles.admin])], PhotosController.new);

export default router;