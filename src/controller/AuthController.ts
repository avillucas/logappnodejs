import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
    
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({ message: 'Username & Password are required!' });
        }
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (e) {
            return res.status(400).json({ message: 'The user or password are incorrect!' });
        }
        if (user.checkPassword(password)) { 
            const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
            return res.json({ 'message': 'Ok', token, 'role': user.role, 'code':user.password, 'userId':user.id ,'credit':user.credit});
        }
        return res.status(400).json({ message: 'The user or password are incorrect!' });
    }

    static register = async (req: Request, res: Response) => {
        const { username, password, name, surname, dni } = req.body;
        const user = new User();
        user.username = username;
        user.password = password;
        user.name = name;
        user.surname = surname;
        user.dni = dni;
        user.role = config.Roles.usuario;
        const validateOptions = { validationError: { target: false, value: false } };
        const errors = await validate(user, validateOptions);
        if (errors.length) {
            return res.status(401).json({ errors });
        }
        user.setPassword(password);        
        try{
            const userRepository = getRepository(User);        
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message:'User already exists!'});
        }
        res.json({ message: 'User created!' });
    }

    static changePassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            return res.status(400).json({ message: 'OldPasword and newPassword are required!' });
        }
        let user: User;
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(userId);
        } catch (error) {
            return res.status(404).json({ message: 'User not found!' });
        }
        if (!user.checkPassword(oldPassword)) {
            return res.status(401).json({ message: 'OldPassword did not match!' });
        }
        user.password = newPassword;
        const validateOptions = { validationError: { target: false, value: false } };
        const errors = await validate(user, validateOptions);
        if (errors.length) {
            return res.status(401).json({ errors });
        }
        user.setPassword(newPassword);
        userRepository.save(user);
        res.json({ message: 'Password changed!' });
    }   
}
export default AuthController;