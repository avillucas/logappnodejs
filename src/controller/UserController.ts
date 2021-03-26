import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';

export class UserController {

    static getAll= async (req:Request, res:Response)=>{
        const userRepository = getRepository(User);
        const user = await userRepository.find();
        if(user.length > 0 ){
            res.send(user);
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

    static newUser = async(req:Request, res:Response) => {
        const {username, password, role} = req.body;
        console.log(username, password, role);
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

    static editUser = async (req:Request, res:Response) =>  {
        const {id}  = req.params;
        const {username, role} = req.body;
        const userRepository = getRepository(User);
        let user:User;
        try{
            user = await userRepository.findOneOrFail(id);               
        }catch(e){
            res.status(404).json({message:'User not found!'});
        }
        const errors =await validate(user);           
        if(errors.length){
            return res.status(400).json(errors);
        }
        user.username  = username;
        user.role  = role;        
        try {
            await userRepository.save(user);            
        } catch (error) {
            return res.status(409).json({message:'User with the same usename already exists!'});   
        }
        res.status(201).send({message:'User updated',user:user});
    }

    static deleteUser = async(req:Request, res:Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user:User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({message:'User not found'})
        }
        try{
            userRepository.remove(id);
        }catch(error){
            res.status(500).send({message:'User cannot be deleted!'});
        }
        res.status(200).send({message:'User deleted!'});
    }
}

export default UserController;