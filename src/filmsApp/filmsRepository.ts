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
        let films = await client.film.findMany()
        let genres = await client.genre.findMany()
        let genresOnFilms = await client.genresOnFilms.findMany()


        let actors = await client.actor.findMany()
        let actorsOnFilms = await client.actorsOnFilms.findMany()

        let reviews = await client.review.findMany()
        let users = await client.user.findMany()
        
        let jsonResponse: IJsonResponse[] = []
        
        
        films.forEach((film) => {

            let genresOnFilmsTemp = genresOnFilms.filter((pair) => {
                return film.id == pair.filmId;
            })

            let genresNames = <string[]>[]

            genresOnFilmsTemp.forEach((pair) => {
                genres.forEach((genre) => {
                    if (genre.id == pair.genreId){
                        genresNames.push(genre.name)
                    }
                }) 
            })

            //
            let actorsOnFilmsTemp = actorsOnFilms.filter((pair) => {
                return film.id == pair.filmId;
            })

            let actorsNames = <string[]>[]

            actorsOnFilmsTemp.forEach((pair) => {
                actors.forEach((actor) => {
                    if (actor.id == pair.actorId){
                        actorsNames.push(actor.name)
                    }
                }) 
            })


            
            //
            let reviewsTemp = reviews.filter((review) => {
                return review.filmId == film.id
            })

            let correctReviews = reviewsTemp.map((review) => {
                return {
                    "text": review.text,
                    "mark": review.mark,
                    "userId": review.userId
                }
            })
            let finalReviews: any = []
            correctReviews.forEach((review) => {
                users.forEach((user) => {
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

async function getFilmById(id: number){
    
    try{
        const film = await client.film.findUnique({
            where: {
                id: id
            }
        })


        let genresOnFilms = await client.genresOnFilms.findMany({
            where: {
                filmId: id
            }
        })
        let genres = await client.genre.findMany({
            where: {
                id: {
                    in: genresOnFilms.map(obj => obj.genreId)
                }

            }
        })
        let genresNames = genres.map(genre => {
            return genre.name
        })



        
        let actorsOnFilms = await client.actorsOnFilms.findMany({
            where:{
                filmId: id
            }
        })
        let actors = await client.actor.findMany({
            where:{
                id: {
                    in: actorsOnFilms.map(obj => obj.actorId)
                }
            }
        })
        let actorsNames = actors.map(actor => {
            return actor.name
        })

        let reviews = await client.review.findMany({
            where: {
                filmId: id 
            }
        })
        let users = await client.user.findMany({
            where: {
                id: {
                    in: reviews.map(obj => obj.userId)
                }
            }
        })

        // genresOnFilms = genresOnFilms.filter((pair) => {
        //     return film.id == pair.filmId;
        // })

        // let genresNames = <string[]>[]

        // genresOnFilms.forEach((pair) => {
        //     genres.forEach((genre) => {
        //         if (genre.id == pair.genreId){
        //             genresNames.push(genre.name)
        //         }
        //     }) 
        // })

        //
        // actorsOnFilms = actorsOnFilms.filter((pair) => {
        //     return film.id == pair.filmId;
        // })

        // let actorsNames = <string[]>[]

        // actorsOnFilms.forEach((pair) => {
        //     actors.forEach((actor) => {
        //         if (actor.id == pair.actorId){
        //             actorsNames.push(actor.name)
        //         }
        //     }) 
        // })


        
        //
        // reviews = reviews.filter((review) => {
        //     return review.filmId == film.id
        // })

        // let correctReviews = []
        // correctReviews = reviews.map((review) => {
        //     return {
        //         "text": review.text,
        //         "mark": review.mark,
        //         "userId": review.userId
        //     }
        // })
        // let finalReviews: any = []
        // correctReviews.forEach((review) => {
        //     users.forEach((user) => {
        //         if (user.id === review.userId) {
        //             finalReviews.push({
        //                 "text": review.text,
        //                 "mark": review.mark,
        //                 "user": {
        //                     "src": user.src,
        //                     "name": user.name
        //                 }
        //             })
        //         }
        //     })
        // })

        let finalReviews: Object[] = []
        users.forEach((user) => {
            reviews.forEach(review => {
                if (user.id == review.userId) {
                    finalReviews.push({
                        text: review.text,
                        mark: review.mark,
                        user: {
                            src: user.src,
                            name: user.name
                        }
                    })
                }
            })
        })


        let jsonResponse = film && {
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
        }


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


async function getFilmsNameAndId(){
    try{
        const films = await client.film.findMany({
            select:{
                id: true,
                name: true
            }
        })
        console.log(films)
        return films
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
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId
}

export default filmsRepository