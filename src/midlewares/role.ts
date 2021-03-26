import {Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entity/User';

export const checkRole = (roles:Array<string>,) => {
    return async(req:Request, res:Response, next:NextFunction)=>{
        const {userId} = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        let user:User;
        try {
            user = await userRepository.findOneOrFail(userId);            
        } catch (error) {
            return res.status(401).json({message:'User not found!'});
        } 
        const {role} = user;        
        if(!roles.includes(role)){
            return res.status(401).json({message:'Rol Not Authorized'});    
        }        
        next();
    }
}