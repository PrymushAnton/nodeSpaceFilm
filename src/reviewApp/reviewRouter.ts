import reviewsController from './reviewController';
import {Router} from 'express';

const reviewsRouter = Router();


reviewsRouter.get("/fields", reviewsController.getReviewFields)
reviewsRouter.get("/all", reviewsController.getAllReviews)
reviewsRouter.get("/all/names", reviewsController.getAllNameReviews)
reviewsRouter.get("/full/:id", reviewsController.getReviewByIdFull)


reviewsRouter.post("/create", reviewsController.createOneReview)
reviewsRouter.post("/update", reviewsController.updateOneReview)
reviewsRouter.post("/delete", reviewsController.deleteOneReview)

export default reviewsRouter