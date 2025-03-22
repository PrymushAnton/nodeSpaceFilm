import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FilmCreatePayload, FilmDeletePayload, FilmUpdatePayload } from "./types";


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

async function getFilmByIdFull(id:number){
    try{
        const film = await client.film.findUnique({
            where: {
                id: id
            },
            include: {
                genres: {
                    select:{
                        genreId: true
                    }
                },
                actors: {
                    select: {
                        actorId: true
                    }
                },
                directors: {
                    select: {
                        directorId: true
                    }
                }
            },
            omit: {
                id: true
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

async function getFilmFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Film")?.fields
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


async function createOneFilm(data: FilmCreatePayload){
    const {actors, directors, genres, ...filmData} = data

    try {

        const isFilmExists = await client.actor.findUnique({
            where:{
                name: filmData.name
            }
        })

        if (isFilmExists) return {status: "error", message: "Film already exists"}

        const film = await client.film.create({
            data: filmData
        })

        const actorsOnFilms = await client.actorsOnFilms.createMany({
            data: actors.map((actorId) => {
                return {filmId:film.id, actorId: +actorId}
            })
        })

        const directorsOnFilms = await client.directorsOnFilms.createMany({
            data: directors.map((directorId) => {
                return {filmId:film.id, directorId: +directorId}
            })
        })

        const genresOnFilms = await client.genresOnFilms.createMany({
            data: genres.map((genreId) => {
                return {filmId:film.id, genreId: +genreId}
            })
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

async function updateOneFilm(data: FilmUpdatePayload){
    console.log(data)
    const {actors, directors, genres, ...filmData} = data

    try {
        const film = await client.film.update({
            where: {
                id: +filmData.id
            },
            data: filmData
        })

        await client.actorsOnFilms.deleteMany({
            where: {
                filmId: +filmData.id
            }
        })

        await client.actorsOnFilms.createMany({
            data: actors.map((actorId) => {
                return {filmId:film.id, actorId: +actorId}
            })
        })



        await client.directorsOnFilms.deleteMany({
            where: {
                filmId: +filmData.id
            }
        })

        await client.directorsOnFilms.createMany({
            data: directors.map((directorId) => {
                return {filmId:film.id, directorId: +directorId}
            })
        })



        await client.genresOnFilms.deleteMany({
            where: {
                filmId: +filmData.id
            }
        })

        await client.genresOnFilms.createMany({
            data: genres.map((genreId) => {
                return {filmId: film.id, genreId: +genreId}
            })
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

async function deleteOneFilm(data: FilmDeletePayload){
    try {
        await client.actorsOnFilms.deleteMany({
            where: {
                filmId: data.id
            }
        })

        await client.directorsOnFilms.deleteMany({
            where: {
                filmId: data.id
            }
        })

        await client.genresOnFilms.deleteMany({
            where: {
                filmId: data.id
            }
        })

        await client.review.deleteMany({
            where: {
                filmId: data.id
            }
        })

        const film = await client.film.delete({
            where: {
                id: data.id
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
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId,
    getFilmByIdFull: getFilmByIdFull,
    getFilmFields: getFilmFields,
    createOneFilm: createOneFilm,
    updateOneFilm: updateOneFilm,
    deleteOneFilm: deleteOneFilm
}

export default filmsRepository