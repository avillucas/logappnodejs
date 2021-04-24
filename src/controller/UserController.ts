import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';

export class UserController {

    static getAll= async (req:Request, res:Response)=>{
        const userRepository = getRepository(User);
        let result: [User[],number];
        try {
            result =  await userRepository.findAndCount({select:['id','role','name','surname','createdAt','sexo','username','dni']});
        } catch (error) {
            res.status(500).json({message:'Somenthing goes wrong!'});
        }        
        if(result.length > 0 ){
            res.send({'list':result[0] , 'total':result[1] });
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
        const {username, password, name, surname, role, sexo,  dni} = req.body;        
        const user = new User();
        user.username = username;
        user.name = name;
        user.surname = surname;
        user.sexo = sexo;
        user.dni = dni;        
        user.setPassword(password);
        user.role = role;
        const validationOptions = {validationError:{target:false, value:false}};
        const errors =await validate(user,validationOptions);
        if(errors.length){
            return res.status(400).json(errors);        
        }
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
        const validationOptions = {validationError:{target:false, value:false}};
        const errors =await validate(user,validationOptions);           
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