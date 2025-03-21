import genresController from './reviewController';
import {Router} from 'express';

const genresRouter = Router();

genresRouter.get("/all", genresController.getAllGenres)
genresRouter.get("/all/names", genresController.getReviewsNameAndId)




export default genresRouter