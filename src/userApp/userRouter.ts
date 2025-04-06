import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import usersController from './userController';
import {Router} from 'express';

const usersRouter = Router();

usersRouter.post('/login', usersController.authUser)
usersRouter.post('/register', usersController.registerUser)

usersRouter.get("/me", authTokenMiddleware, usersController.getUserById)




usersRouter.use(authTokenMiddleware)
usersRouter.use(checkRoleMiddleware)

usersRouter.get("/fields", usersController.getUserFields)
usersRouter.get("/all", usersController.getAllUsers)
usersRouter.get("/all/names", usersController.getAllNameUsers)
usersRouter.get("/full/:id", usersController.getUserByIdFull)


usersRouter.post("/create", usersController.createOneUser)
usersRouter.post("/update", usersController.updateOneUser)
usersRouter.post("/delete", usersController.deleteOneUser)

export default usersRouter