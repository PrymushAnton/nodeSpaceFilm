import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


interface IJsonResponse{
    "categories":{
        "genres": String[]
    },
    "src": String,
    "name": String,
    "description": String,
    "rating": Number
}


async function getAllGenres(){
    try{
        const genres = await client.genre.findMany()
        return genres
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

async function getReviewsNameAndId(){
    try{
        const reviews = await client.review.findMany({
            select:{
                id: true,
                name: true
            }
        })
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

const genresRepository = {
    getAllGenres: getAllGenres,
    getReviewsNameAndId: getReviewsNameAndId
}

export default genresRepository