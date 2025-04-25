import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import reviewsController from './reviewController';
import {Router} from 'express';

const reviewsRouter = Router();



reviewsRouter.use(authTokenMiddleware)

reviewsRouter.post("/create-role-user", reviewsController.createOneReviewByUser)

reviewsRouter.use(checkRoleMiddleware)

reviewsRouter.get("/fields", reviewsController.getReviewFields)
reviewsRouter.get("/all", reviewsController.getAllReviews)
reviewsRouter.get("/all/names", reviewsController.getAllNameReviews)
reviewsRouter.get("/full/:id", reviewsController.getReviewByIdFull)


reviewsRouter.post("/create", reviewsController.createOneReview)
reviewsRouter.post("/update", reviewsController.updateOneReview)
reviewsRouter.post("/delete", reviewsController.deleteOneReview)

export default reviewsRouter