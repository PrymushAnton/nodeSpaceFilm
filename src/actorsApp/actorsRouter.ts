import actorsController from './actorsController';
import {Router} from 'express';

const actorsRouter = Router();

actorsRouter.get("/fields", actorsController.getActorFields)
actorsRouter.get("/all", actorsController.getAllActors)
actorsRouter.get("/:id", actorsController.getActorById)
actorsRouter.get("/all/names", actorsController.getAllNameActors)
actorsRouter.get("/full/:id", actorsController.getActorByIdFull)


actorsRouter.post("/create", actorsController.createOneActor)
actorsRouter.post("/update", actorsController.updateOneActor)
actorsRouter.post("/delete", actorsController.deleteOneActor)


export default actorsRouter