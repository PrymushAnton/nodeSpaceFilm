import directorsController from './directorsController';
import {Router} from 'express';

const directorsRouter = Router();

directorsRouter.get("/all", directorsController.getAllDirectors)
directorsRouter.get("/:id", directorsController.getDirectorById)


export default directorsRouter