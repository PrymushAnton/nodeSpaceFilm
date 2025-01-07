import genresController from './genresController';
import {Router} from 'express';

const genresRouter = Router();

genresRouter.get("/all", genresController.getAllGenres)



export default genresRouter