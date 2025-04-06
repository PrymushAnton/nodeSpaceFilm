import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import genresController from './genresController';
import {Router} from 'express';

const genresRouter = Router();

genresRouter.get("/all", genresController.getAllGenres)


genresRouter.use(authTokenMiddleware)
genresRouter.use(checkRoleMiddleware)

genresRouter.get("/fields", genresController.getGenreFields)
genresRouter.get("/all/names", genresController.getGenresNameAndId)
genresRouter.get("/full/:id", genresController.getGenreByIdFull)


genresRouter.post("/create", genresController.createOneGenre)
genresRouter.post("/update", genresController.updateOneGenre)
genresRouter.post("/delete", genresController.deleteOneGenre)

export default genresRouter