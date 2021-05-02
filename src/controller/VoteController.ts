import {getRepository,  Not} from "typeorm";
import {Request, Response} from "express";
import {validate} from 'class-validator';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { Vote } from '../entity/Vote';

export class VoteController {
   
   //POST 
   static new = async(req:Request, res:Response) => {
    let vote = new Vote();
    const validationOptions = {validationError:{target:false, value:false}};    
    const userId = req.userId;
    const {votePositive,photoId} = req.body;        
    try{          
        const user = await getRepository(User).findOneOrFail(userId);
        let photo = await getRepository(Photo).findOneOrFail(photoId);
        if(votePositive){
            photo.likes += 1;
        }else{
            photo.dislikes += 1;
        }
        await getRepository(Photo).save(photo);        
        //
        vote.photo = photoId;
        vote.voter = user;
        vote.like = votePositive as boolean;
        const voteErrors =await validate(vote,validationOptions);    
        if(voteErrors.length){
            return res.status(400).json(voteErrors);        
        }                
        await getRepository(Vote).save(vote);                        
    }catch(e){
        return res.status(409).json({message:'Vote could not be created!'});
    }    
        res.status(201).json({message:'Vote created!',vote});
    }   
    
}

export default VoteController;