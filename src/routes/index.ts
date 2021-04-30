import {Router} from 'express';
import auth from './auth';
import user from './user';
import photo from './photo';
import vote from './vote';
import credit from './credit';

const routes  = Router();
routes.use('/auth',auth);
routes.use('/users',user);
routes.use('/photos',photo);
routes.use('/votes',vote);
routes.use('/charge',credit);

export default routes;