import adminController from './adminController';
import {Router} from 'express';

const adminRouter = Router();

adminRouter.get("/all", adminController.getAllModels)

export default adminRouter