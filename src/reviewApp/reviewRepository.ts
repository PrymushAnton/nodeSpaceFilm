import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ReviewCreatePayload, ReviewDeletePayload, ReviewUpdatePayload } from "./types";


async function getAllReviews(){
    try{
        const reviews = await client.review.findMany()
        return reviews
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
    
}

async function getAllNameReviews(){
    try{
        const reviews = await client.review.findMany(
            {
                select:{
                    id: true,
                    name: true
                }
            }
        )
        return reviews
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
}

async function getReviewByIdFull(id:number){
    try{
        const review = await client.review.findUnique({
            where: {
                id: id
            },
            include: {
                film: true
            },
            omit: {
                id: true
            }
        })

        return review
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
}
async function createOneReview(data: ReviewCreatePayload){

    try {
        const review = await client.review.create({
            data: data
        })

        return {status: "success"}
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
    
}

async function updateOneReview(data: ReviewUpdatePayload){
    console.log(data)
    try {
        const review = await client.review.update({
            where: {
                id: data.id
            },
            data: data
        })

        return review
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
}

async function deleteOneReview(data: ReviewDeletePayload){
    try {
        const review = await client.review.delete({
            where: {
                id: data.id
            }
        })
        return review
    } catch (error){
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
}

async function getReviewFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Review")?.fields
        return fields
    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
}

const genresRepository = {
    getAllReviews: getAllReviews,
    getAllNameReviews: getAllNameReviews,
    getReviewByIdFull: getReviewByIdFull,
    createOneReview: createOneReview,
    deleteOneReview: deleteOneReview,
    updateOneReview: updateOneReview,
    getReviewFields: getReviewFields
}

export default genresRepository