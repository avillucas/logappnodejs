import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from 'cors';
import * as helmet from "helmet";
import routes from './routes';

const PORT = process.env.PORT || 3000; 

createConnection(
    {        
        type: "mysql",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: ["src/entity/*.*"],
        extra: {
          ssl: process.env.SSL || false,
        }
    }
  ).then(async connection => {

    // create express app
    const app = express();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Credentials", true);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
      next();
    });
    app.use(cors());
    app.use(helmet()); 
    app.use(express.json());  
    app.use('/',routes);

    // start express server
    app.listen(PORT, () => console.log(`server runing on port ${PORT}`));


}).catch(error => console.log(error));
