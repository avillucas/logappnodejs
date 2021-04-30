import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req:Request, res:Response, next:NextFunction) => {
    //const token  = <string> req.headers['authorization'];
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({message:'Not autorized!'});
    }
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token,config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;        
    } catch (error) {
        return res.status(401).json({message:'Not autorized!'});
    }
    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username},config.jwtSecret, {expiresIn:'1h'});
    res.setHeader('token',token);
    req.userId = userId
    next();
}