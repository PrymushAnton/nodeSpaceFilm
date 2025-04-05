import reviewsRepository from "./reviewRepository"
import { ReviewCreatePayload, ReviewDeletePayload, ReviewUpdatePayload } from "./types"




async function getAllReviews(){
    const reviews = await reviewsRepository.getAllReviews()
    return reviews
}


async function getAllNameReviews(){
    const reviews = await reviewsRepository.getAllNameReviews()
    return reviews
}


async function getReviewByIdFull(id: number){
    const review = await reviewsRepository.getReviewByIdFull(id)

    if (!review) return {error: "error"}
    
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
    return reviewObjNew
}

async function createOneReview(data: ReviewCreatePayload){
    const review = await reviewsRepository.createOneReview(data)
    return review
}

async function updateOneReview(data: ReviewUpdatePayload){
    const review = await reviewsRepository.updateOneReview(data)
    console.log(review)

    return review
}

async function deleteOneReview(data: ReviewDeletePayload){
    const review = await reviewsRepository.deleteOneReview(data)
    return review
}


async function getReviewFields(){
    const fields = await reviewsRepository.getReviewFields()

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

    return object
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