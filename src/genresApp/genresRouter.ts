import genresController from './genresController';
import {Router} from 'express';

const genresRouter = Router();

genresRouter.get("/all", genresController.getAllGenres)
genresRouter.get("/all/names", genresController.getGenresNameAndId)




export default genresRouter