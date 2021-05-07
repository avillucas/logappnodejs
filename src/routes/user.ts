import {Router} from 'express';
import UserController from '../controller/UserController';
import {checkJwt} from '../midlewares/jtw';
import {checkRole} from '../midlewares/role';
import config from '../config/config';

const router = Router();
//get all users
router.get('/', [checkJwt], UserController.getAll);
//get one user
router.get('/:id', [checkJwt, checkRole([config.Roles.admin])], UserController.getById);
//Create new user
router.post('/', [checkJwt, checkRole([config.Roles.admin])], UserController.newUser);
//Edit user
router.patch('/:id', [checkJwt, checkRole([config.Roles.admin])], UserController.editUser);
//Remove user
router.delete('/:id', [checkJwt, checkRole([config.Roles.admin])], UserController.deleteUser);

export default router;