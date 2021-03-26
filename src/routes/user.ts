import {Router} from 'express';
import UserController from '../controller/UserController';

const router = Router();
//get all users
router.get('/', UserController.getAll);
//get one user
router.get('/:id', UserController.getById);
//Create new user
router.post('/',UserController.newUser);
//Edit user
router.patch('/:id',UserController.editUser);
//Remove user
router.delete('/:id',UserController.deleteUser);

export default router;