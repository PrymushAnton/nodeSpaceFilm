import filmsController from './filmsController';
import {Router} from 'express';

const filmsRouter = Router();

filmsRouter.get("/all", filmsController.getAllFilms)
filmsRouter.get("/:id", filmsController.getFilmById)


export default filmsRouter