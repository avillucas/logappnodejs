import {Router} from 'express';
import routes from '.';
import UserController from '../controller/UserController';

const router = Router();
//get all users
router.get('/', UserController.getAll);
//get one user
router.get('/:id', UserController.getById);
//Create new user
routes.post('/create',UserController.newUser);
//Edit user
routes.patch('/:id',UserController.editUser);
//Remove user
routes.delete('/:id',UserController.deleteUser);

export default router;