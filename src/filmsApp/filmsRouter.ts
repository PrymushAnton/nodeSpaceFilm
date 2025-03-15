import filmsController from './filmsController';
import {Router} from 'express';

const filmsRouter = Router();

filmsRouter.get("/all", filmsController.getAllFilms)
filmsRouter.get("/:id", filmsController.getFilmById)
filmsRouter.get("/all/names", filmsController.getFilmsNameAndId)



export default filmsRouter