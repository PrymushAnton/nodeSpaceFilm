import { Request, Response } from 'express'

import reviewsService from "./reviewService";
import { ReviewCreatePayload, ReviewDeletePayload, ReviewUpdatePayload } from './types';


async function getAllReviews(req: Request, res: Response){
    const reviews = await reviewsService.getAllReviews()
    res.json(reviews)
}

async function getAllNameReviews(req: Request, res: Response){
    const reviews = await reviewsService.getAllNameReviews()
    res.json(reviews)
}

async function getReviewByIdFull(req: Request, res: Response){
    const id = +req.params.id
    const review = await reviewsService.getReviewByIdFull(id)
    res.json(review)
}

async function createOneReview(req: Request, res: Response){
    const data: ReviewCreatePayload = req.body
    data.filmId = +data.filmId
    data.userId = +data.userId
    data.mark = +data.mark
    const review = await reviewsService.createOneReview(data)
    console.log(data)
    res.json({status: "create"})
}

async function updateOneReview(req: Request, res: Response){
    const data: ReviewUpdatePayload = req.body
    // console.log(data)

    data.id = +data.id
    data.filmId = +data.filmId
    data.userId = +data.userId
    data.mark = +data.mark

    const review = await reviewsService.updateOneReview(data)
    res.json({status: "update"})
}

async function deleteOneReview(req: Request, res: Response){
    const data: ReviewDeletePayload = req.body
    data.id = +data.id
    console.log(data)

    const review = await reviewsService.deleteOneReview(data)
    res.json({status: "delete"})
}



async function getReviewFields(req: Request, res: Response){
    const fields = await reviewsService.getReviewFields()
    res.json(fields)
}


const reviewsController = {
    getAllReviews: getAllReviews,
    getAllNameReviews: getAllNameReviews,
    getReviewByIdFull: getReviewByIdFull,
    createOneReview: createOneReview,
    updateOneReview: updateOneReview,
    deleteOneReview: deleteOneReview,
    getReviewFields: getReviewFields
}

export default reviewsController