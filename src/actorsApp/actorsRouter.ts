import actorsController from './actorsController';
import {Router} from 'express';

const actorsRouter = Router();

actorsRouter.get("/all", actorsController.getAllActors)
actorsRouter.get("/:id", actorsController.getActorById)


export default actorsRouter