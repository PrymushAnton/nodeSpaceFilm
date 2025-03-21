import filmsController from './filmsController';
import {Router} from 'express';

const filmsRouter = Router();

filmsRouter.get("/fields", filmsController.getFilmFields)
filmsRouter.get("/all", filmsController.getAllFilms)
filmsRouter.get("/:id", filmsController.getFilmById)
filmsRouter.get("/all/names", filmsController.getFilmsNameAndId)
filmsRouter.get("/full/:id", filmsController.getFilmByIdFull)

filmsRouter.post("/create", filmsController.createOneFilm)
filmsRouter.post("/update", filmsController.updateOneFilm)
filmsRouter.post("/delete", filmsController.deleteOneFilm)



export default filmsRouter