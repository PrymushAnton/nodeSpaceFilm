import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import actorsController from './actorsController';
import {Router} from 'express';

const actorsRouter = Router();


actorsRouter.get("/fields", authTokenMiddleware, checkRoleMiddleware,  actorsController.getActorFields)
actorsRouter.get("/:id", actorsController.getActorById)


actorsRouter.use(authTokenMiddleware)
actorsRouter.use(checkRoleMiddleware)

actorsRouter.get("/all", actorsController.getAllActors)
actorsRouter.get("/all/names", actorsController.getAllNameActors)
actorsRouter.get("/full/:id", actorsController.getActorByIdFull)


actorsRouter.post("/create", actorsController.createOneActor)
actorsRouter.post("/update", actorsController.updateOneActor)
actorsRouter.post("/delete", actorsController.deleteOneActor)


export default actorsRouter