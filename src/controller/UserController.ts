import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Validate} from 'class-validator';

export class UserController {

    static getAll= async (req:Request, res:Response)=>{
        const userRepository = getRepository(User);
        const user = await userRepository.find();
        if(user.length > 0 ){
            res.send(users);
        }else{
            res.status(404).json({message:'Not result'});
        }
    }

    static getById= async (req:Request, res:Response)=>{
        const {id}  = req.params;
        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }catch(e){
            res.status(404).json({message:'No result'});
        }
    }

    static newUser(req:Request, res:Response){
        const {username, password, role} = req.params;
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        // validate 
        const errors =await validate(user);
        if(errors.length){
            return res.status(400).json(errors);
        }
        //@todo hash password
        const userRepository = getRepository(User);
        try{
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message:'User already exists!'});
        }
       res.status(201).json({message:'User created!',user:user});
    }

    static editUser = async (req:Request, res:Response){
        //let user 
    }
}

export default UserController;