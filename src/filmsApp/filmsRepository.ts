import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


interface IUser{
    "src": string,
    "name": string,
}

interface IReview{
    "text": string,
    "mark": number,
    "user": IUser
}

interface IJsonResponse{
    "id": number,
    "name": String,
    "src": String,
    "rating": Number,
    "year": number,
    "baseLanguage": string,
    "homeCountry": string,
    "ageRestriction": string,
    "description": String,
    "genres": String[],
    "photo1": String,
    "photo2": String,
    "photo3": String,
    "photo4": String,
    "actors": String[],
    "reviews": IReview[]
}


async function getAllFilms(){
    try{
        const films = await client.film.findMany()
        const genres = await client.genre.findMany()
        const genresOnFilms = await client.genresOnFilms.findMany()


        const actors = await client.actor.findMany()
        const actorsOnFilms = await client.actorsOnFilms.findMany()

        const reviews = await client.review.findMany()
        const users = await client.user.findMany()

        
        let jsonResponse: IJsonResponse[] = []
        
        
        films.forEach((film) => {
            let genresOfFilmIds = genresOnFilms
            let genresOfFilmsNames = genres

            let actorsOnFilmsIds = actorsOnFilms
            let actorsObjs = actors

            let allReviews = reviews
            let allUsers = users
            //
            genresOfFilmIds = genresOfFilmIds.filter((pair) => {
                return film.id == pair.filmId;
            })

            let genresNames = <string[]>[]

            genresOfFilmIds.forEach((pair) => {
                genresOfFilmsNames.forEach((genre) => {
                    if (genre.id == pair.genreId){
                        genresNames.push(genre.name)
                    }
                }) 
            })

            //
            actorsOnFilmsIds = actorsOnFilmsIds.filter((pair) => {
                return film.id == pair.filmId;
            })

            let actorsNames = <string[]>[]

            actorsOnFilmsIds.forEach((pair) => {
                actorsObjs.forEach((actor) => {
                    if (actor.id == pair.actorId){
                        actorsNames.push(actor.name)
                    }
                }) 
            })


            
            //
            let reviewsOnFilm = allReviews.filter((review) => {
                return review.filmId == film.id
            })

            let correctReviews = []
            correctReviews = reviewsOnFilm.map((review) => {
                return {
                    "text": review.text,
                    "mark": review.mark,
                    "userId": review.userId
                }
            })
            let finalReviews: any = []
            correctReviews.forEach((review) => {
                allUsers.forEach((user) => {
                    if (user.id === review.userId) {
                        finalReviews.push({
                            "text": review.text,
                            "mark": review.mark,
                            "user": {
                                "src": user.src,
                                "name": user.name
                            }
                        })
                    }
                })
            })
            
            jsonResponse.push({
                "id": film.id,
                "name": film.name,
                "src": film.src,
                "rating": film.rating,
                "year": film.year,
                "baseLanguage": film.baseLanguage,
                "homeCountry": film.homeCountry,
                "ageRestriction": film.ageRestriction,
                "description": film.description,
                "genres": genresNames,
                "photo1": film.photo1,
                "photo2": film.photo2,
                "photo3": film.photo3,
                "photo4": film.photo4,
                "actors": actorsNames,
                "reviews": finalReviews
            })
            
        })
        return jsonResponse
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

async function getFilmById(id: number){
    
    try{
        const film = await client.film.findUnique({
            where: {
                id: id
            }
        })
        return film

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




const filmsRepository = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById
}

export default filmsRepository