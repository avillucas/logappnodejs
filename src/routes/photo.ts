import {Router} from 'express';
import PhotosController from '../controller/PhotosController';
import {checkJwt} from '../midlewares/jtw';

const router = Router();
//get photos not owned by the user
router.get('/:page', [checkJwt], PhotosController.getnotUserList);
//Create new photo
router.post('/', [checkJwt, [checkJwt]], PhotosController.new);

export default router;