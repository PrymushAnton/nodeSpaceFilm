import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import filmsController from './filmsController';
import {Router} from 'express';

const filmsRouter = Router();

filmsRouter.get("/all", filmsController.getAllFilms)
filmsRouter.get("/:id", filmsController.getFilmById)

filmsRouter.use(authTokenMiddleware)
filmsRouter.use(checkRoleMiddleware)

filmsRouter.get("/fields", filmsController.getFilmFields)
filmsRouter.get("/all/names", filmsController.getFilmsNameAndId)
filmsRouter.get("/full/:id", filmsController.getFilmByIdFull)

filmsRouter.post("/create", filmsController.createOneFilm)
filmsRouter.post("/update", filmsController.updateOneFilm)
filmsRouter.post("/delete", filmsController.deleteOneFilm)



export default filmsRouter