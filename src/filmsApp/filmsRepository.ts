import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FilmCreatePayload, FilmDeletePayload, FilmUpdatePayload } from "./types";



async function getAllFilms(){
    try{
        const films = await client.film.findMany({
            include: {
                reviews: {
                    select: {
                        name: true,
                        text: true,
                        mark: true,
                        user: {
                            select: {
                                src: true,
                                name: true
                            }
                        }
                    }
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                actors: {
                    select: {
                        actor:{
                            select: {
                                name: true,
                                id: true
                            }
                        }
                    }
                }
            }
        })

        const newFilms = films.map(film => ({
            ...film,
            genres: film.genres.map(genre => genre.genre.name),
            actors: film.actors.map(actor => actor.actor),
        }));

        return newFilms
    } catch (error){
        return (error as Error).message
    }
    
}

async function getFourFilms(){
    try{
        const films = await client.film.findMany({
            orderBy: {
                id: "desc"
            },
            take: 4,
        })
        return films
    } catch (error){
        return (error as Error).message
    }
    
}



async function getFilmById(id: number){
    
    try{
        const film = await client.film.findUnique({
            where: {
                id: id
            },
            include: {
                reviews: {
                    select: {
                        name: true,
                        text: true,
                        mark: true,
                        user: {
                            select: {
                                src: true,
                                name: true
                            }
                        }
                    }
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                actors: {
                    select: {
                        actor:{
                            select: {
                                name: true,
                                id: true
                            }
                        }
                    }
                }
            }
        })
        if (!film) return film
        const newFilm = {
            ...film,
            genres: film.genres.map(genre => genre.genre.name),
            actors: film.actors.map(actor => actor.actor),
        }

        return newFilm

    } catch (error){
        return (error as Error).message
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
        return (error as Error).message
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
        return (error as Error).message
    }
}

async function getFilmFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Film")?.fields.filter(field => field.name !== "reviews")
        return fields
    } catch (error){
        return (error as Error).message
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
        if (isFilmExists) {
            console.log(12312312)
            return null
        }
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
        return [film, actorsOnFilms, directorsOnFilms, genresOnFilms]
    } catch (error){
        return (error as Error).message
    }
    
}

async function updateOneFilm(data: FilmUpdatePayload){
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
        return (error as Error).message
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
        return (error as Error).message
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
    deleteOneFilm: deleteOneFilm,
    getFourFilms: getFourFilms
}

export default filmsRepository