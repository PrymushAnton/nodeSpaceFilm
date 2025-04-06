import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import adminController from './adminController';
import {Router} from 'express';

const adminRouter = Router();

adminRouter.use(authTokenMiddleware)
adminRouter.use(checkRoleMiddleware)

adminRouter.get("/all", adminController.getAllModels)

export default adminRouter