import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import usersController from './userController';
import {Router} from 'express';

const usersRouter = Router();

usersRouter.post('/login', usersController.authUser)
usersRouter.post('/register', usersController.registerUser)


usersRouter.use(authTokenMiddleware)

usersRouter.get("/me", usersController.getUserById)
usersRouter.get("/get-favourite-films", usersController.getUserFavouriteFilms)

usersRouter.post("/add-favourite-film", usersController.getUserFavouriteFilms)
usersRouter.post("/remove-favourite-film", usersController.getUserFavouriteFilms)


usersRouter.use(checkRoleMiddleware)

usersRouter.get("/fields", usersController.getUserFields)
usersRouter.get("/all", usersController.getAllUsers)
usersRouter.get("/all/names", usersController.getAllNameUsers)
usersRouter.get("/full/:id", usersController.getUserByIdFull)


usersRouter.post("/create", usersController.createOneUser)
usersRouter.post("/update", usersController.updateOneUser)
usersRouter.post("/delete", usersController.deleteOneUser)

export default usersRouter