import {getRepository,  Not} from "typeorm";
import {Request, Response} from "express";
import {validate} from 'class-validator';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { Vote } from '../entity/Vote';

export class PhotosController {

   //GET 
   //aceptar userId y Pagina
   //retorna un listado con el total , las paginas     

   static getnotUserList= async (req:Request, res:Response)=>{
    const limit = 20;
    const {userId, page }  = req.params;
    const offset = ( parseInt(page) -1) * limit    
    const user = getRepository(User).findOne(userId);
    let result: [Photo[],number];
        try{
            //@todo probar
            result =  await getRepository(Photo).findAndCount({            
                where:{
                    owner: Not(user)
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
        const {url, userId, votePositive} = req.body;        
        const user = await getRepository(User).findOne(userId);
        //
        const photo = new Photo();
        photo.owner = user;
        photo.url = url;    
        const photErrors =await validate(photo,validationOptions);    
        if(photErrors.length){
            return res.status(400).json(photErrors);        
        }
        //
        const vote = new Vote();
        vote.photo = photo;
        vote.voter = user;
        vote.like = votePositive as boolean;
        const voteErrors =await validate(vote,validationOptions);    
        if(voteErrors.length){
            return res.status(400).json(voteErrors);        
        }
        try{
            await getRepository(Photo).save(photo);
            await getRepository(Vote).save(vote);        
        }catch(e){
            return res.status(409).json({message:'Photo could not be created!'});
        }    
        res.status(201).json({message:'Photo created!',user:user});
    }   
    
}

export default PhotosController;