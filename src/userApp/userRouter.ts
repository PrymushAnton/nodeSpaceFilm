import usersController from './userController';
import {Router} from 'express';

const usersRouter = Router();


usersRouter.get("/fields", usersController.getUserFields)
usersRouter.get("/all", usersController.getAllUsers)
usersRouter.get("/all/names", usersController.getAllNameUsers)
usersRouter.get("/full/:id", usersController.getUserByIdFull)


usersRouter.post("/create", usersController.createOneUser)
usersRouter.post("/update", usersController.updateOneUser)
usersRouter.post("/delete", usersController.deleteOneUser)

export default usersRouter