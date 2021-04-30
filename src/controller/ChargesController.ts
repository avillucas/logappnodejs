import {getRepository,  Not} from "typeorm";
import {Request, Response} from "express";
import {validate} from 'class-validator';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { Vote } from '../entity/Vote';
import { Charge } from '../entity/Charge';

export class ChagersController {

   //GET 
   //aceptar userId y Pagina
   //retorna un listado con el total , las paginas     

   static getUserList= async (req:Request, res:Response)=>{
    const limit = 20;
    const userId = req.userId;
    const { page }  = req.params;
    const offset = ( parseInt(page) -1) * limit    
    const user = getRepository(User).findOne(userId);
    let result: [Charge[],number];
        try{
            //@todo probar
            result =  await getRepository(Charge).findAndCount({            
                where:{
                    owner: user
                },
                order:{createdAt:"DESC"},
                skip: offset,
                take:limit,
            });                                    
            res.send({'list':result[0] , 'total':result[1], page, limit, totalPages: (result[1]/limit) as number });            
        }catch(e){
            res.status(404).json({message:'No result'});
        }  
    }   
   //POST 
   static new = async(req:Request, res:Response) => {
        const validationOptions = {validationError:{target:false, value:false}};
        const userId = req.userId;
        const {credit,code }  = req.body;        
        let user:User;
        try{
           user = await getRepository(User).findOne(userId);    
        }catch(e){
            res.status(404).json({message:'User not found!'});
        }
        user.credit += credit as number;
        let charge = new Charge();        
        charge.credit = credit;
        charge.rechargeCode = code;
        const creditErrors =await validate(charge,validationOptions);    
        if(creditErrors.length){
            return res.status(400).json(creditErrors);        
        }
        try{
            await getRepository(User).save(user);
        }catch(e){
            return res.status(409).json({message:'User could not be updated!'});
        }    
        try{
            await getRepository(Charge).save(charge);                     
        }catch(e){
            return res.status(409).json({message:'Charge could not be created!'});
        }    
        
        res.status(201).json({message:'Charge created!','userCredits':user.credit,charge});
    }   
    
}

export default ChagersController;