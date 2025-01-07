import filmsController from './filmsController';
import {Router} from 'express';

const filmsRouter = Router();

filmsRouter.get("/all", filmsController.getAllFilms)



export default filmsRouter