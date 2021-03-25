import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as cors from 'cors';
import * as helmet from "helmet";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";
const PORT = process.env.PORT || 3000; 

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(express.json);
    app.use(cors());
    app.use(helmet()); 
  
    // start express server
    app.listen(PORT, () => console.log(`server runing on port ${PORT}`));


}).catch(error => console.log(error));
