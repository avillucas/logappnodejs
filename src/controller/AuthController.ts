import {getRepository} from  'typeorm';
import {Request, Response} from  'express';
import {User} from  '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


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
}
export default AuthController;