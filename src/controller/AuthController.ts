import {getRepository} from  'typeorm';
import {Request, Response} from  'express';
import {User} from  '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {validate} from 'class-validator';

class AuthController{
    static login =  async (req:Request,  res:Response) => {
        const {username,password} = req.body;
        if(!(username && password)) {
            return res.status(400).json({message:'Username & Password are required!'});
        }
        const userRepository = getRepository(User);
        let user:User;
        try{
            user = await userRepository.findOneOrFail({where:{username}});
        }catch(e){
            return res.status(400).json({message:'The user or password are incorrect!'});
        }
        if(user.checkPassword(password)){
            const token =  jwt.sign({userId:user.id, username:user.username},config.jwtSecret,{expiresIn:'1h'});
            return res.json({message:'Ok',token});       
        }
        return res.status(400).json({message:'The user or password are incorrect!'});        
    }   

    static changePassword = async(req:Request, res:Response) =>{
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;
        if(!(oldPassword && newPassword)){
            return res.status(400).json({message:'OldPasword and newPassword are required!'});
        }        
        let user:User;
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(userId);            
        } catch (error) {
            return res.status(404).json({message:'User not found!'});
        }
        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'OldPassword did not match!'});
        }
        user.password = newPassword;        
        const validateOptions = {validationError:{target:false, value:false}};
        const errors = await validate(user, validateOptions);        
        if( errors.length){
            return res.status(401).json({errors});
        }
        user.hashPassword();        
        userRepository.save(user);        
        res.json({message:'Password changed!'});        
    }
}
export default AuthController;