import directorsController from './directorsController';
import {Router} from 'express';

const directorsRouter = Router();

directorsRouter.get("/fields", directorsController.getDirectorFields)
directorsRouter.get("/all", directorsController.getAllDirectors)
directorsRouter.get("/:id", directorsController.getDirectorById)
directorsRouter.get("/all/names", directorsController.getAllNameDirectors)
directorsRouter.get("/full/:id", directorsController.getDirectorByIdFull)


directorsRouter.post("/create", directorsController.createOneDirector)
directorsRouter.post("/update", directorsController.updateOneDirector)
directorsRouter.post("/delete", directorsController.deleteOneDirector)


export default directorsRouter