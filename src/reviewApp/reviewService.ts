import reviewsRepository from "./reviewRepository"
import { ReviewCreatePayload, ReviewDeletePayload, ReviewPayload, ReviewUpdatePayload, ReviewNamesPayload } from "./types"
import { ISuccess, IError } from "../types/types"



async function getAllReviews(): Promise<ISuccess<ReviewPayload[]> | IError>{
    const reviews = await reviewsRepository.getAllReviews()

    if (!reviews) return {status: "error", message: "There are no reviews"}
    if (typeof(reviews) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: reviews}
}


async function getAllNameReviews(): Promise<ISuccess<ReviewNamesPayload[]> | IError>{
    const reviews = await reviewsRepository.getAllNameReviews()

    if (!reviews) return {status: "error", message: "Error while getting reviews names"}
    if (typeof(reviews) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: reviews}
}


async function getReviewByIdFull(id: number): Promise<ISuccess<any> | IError>{
    const review = await reviewsRepository.getReviewByIdFull(id)

    if (!review) return {status: "error", message: "Error while getting full review by id"}
    if (typeof(review) === "string") return {status: "error", message: "Error while working with prisma"}
    
    const {filmId, userId, text, ...reviewData} = review
    
    const reviewObj = {
        ...Object.fromEntries(
            Object.entries(reviewData).map(([key, value]) => [
                key,
                { 
                    type: typeof value === 'string' ? 'text' : typeof value,
                    data: value 
                }
            ])
        ),
        text: {
            type: "textarea",
            data: text
        },
        filmId: {
            type: "manytoone",
            data: filmId
        },
		userId: {
            type: "manytoone",
            data: userId
        }
    }
	
	const reviewObjNew = {
		...Object.fromEntries(
			Object.entries(reviewObj).filter(([key, value]) => {
				return key !== "film" && key !== "user"
			}
		))
	}
    return {status: "success", data: reviewObjNew}

}

async function createOneReview(data: ReviewCreatePayload): Promise<ISuccess<string> | IError>{
    const review = await reviewsRepository.createOneReview(data)

    if (!review) return {status: "error", message: "Error while creating review"}
    if (typeof(review) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: "Review was created successfully"}
}

async function updateOneReview(data: ReviewUpdatePayload): Promise<ISuccess<string> | IError>{
    const review = await reviewsRepository.updateOneReview(data)

    if (!review) return {status: "error", message: "Error while updating review"}
    if (typeof(review) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: "Review was updated successfully"}
}

async function deleteOneReview(data: ReviewDeletePayload): Promise<ISuccess<string> | IError>{
    const review = await reviewsRepository.deleteOneReview(data)

    if (!review) return {status: "error", message: "Error while deleting review"}
    if (typeof(review) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: "Review was deleted successfully"}
}


async function getReviewFields(): Promise<ISuccess<any> | IError>{
    const fields = await reviewsRepository.getReviewFields()

    if (!fields) return {status: "error", message: "Error while getting review fields"}
    if (typeof(fields) === "string") return {status: "error", message: "Error while working with prisma"}

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
    
    fields?.forEach(field => {
        if (field.name === "id") return
        if (field.name === "film") return
        if (field.name === "user") return

        object[field.name] = {
            type: field.name === "userId" || field.name === "filmId" 
                ? "manytoone"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "userId" || field.type === "filmId"
                ? 0 
                : field.type === "Int" 
                    ? 0
                    : ""
        }
    })

    return {status: "success", data: object}
}
const genresService = {
    getAllReviews: getAllReviews,
    getAllNameReviews: getAllNameReviews,
    getReviewByIdFull: getReviewByIdFull,
    createOneReview: createOneReview,
    deleteOneReview: deleteOneReview,
    updateOneReview: updateOneReview,
    getReviewFields: getReviewFields
}

export default genresService