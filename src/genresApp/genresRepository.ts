import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { GenreCreatePayload, GenreUpdatePayload, GenreDeletePayload } from "./types";


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

async function getGenresNameAndId(){
    try{
        const genres = await client.genre.findMany({
            select:{
                id: true,
                name: true
            }
        })
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


async function getAllNameGenres(){
    try{
        const genres = await client.genre.findMany(
            {
                select:{
                    id: true,
                    name: true
                }
            }
        )
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

async function getGenreByIdFull(id:number){
    try{
        const genre = await client.genre.findUnique({
            where: {
                id: id
            },
            include: {
                films: {
                    omit: {
                        genreId: true
                    }
                }
            },
            omit: {
                id: true
            }
        })

        return genre
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



async function createOneGenre(data: GenreCreatePayload){
    const {films, ...genreData} = data

    try {

        const isGenreExists = await client.genre.findUnique({
            where:{
                name: genreData.name
            }
        })

        if (isGenreExists) return {status: "error", message: "Genre already exists"}

        const genre = await client.genre.create({
            data: genreData
        })


        const genresOnFilms = await client.genresOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, genreId: genre.id}
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

async function updateOneGenre(data: GenreUpdatePayload){
    const {films, ...genreData} = data

    try {
        const genre = await client.genre.update({
            where: {
                id: +genreData.id
            },
            data: genreData
        })

        await client.genresOnFilms.deleteMany({
            where: {
                genreId: +genreData.id
            }
        })

        await client.genresOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, genreId: genre.id}
            })
        })

        return genre
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

async function deleteOneGenre(data: GenreDeletePayload){
    try {
        await client.genresOnFilms.deleteMany({
            where: {
                genreId: data.id
            }
        })

        const genre = await client.genre.delete({
            where: {
                id: data.id
            }
        })

        return genre
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

async function getGenreFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Genre")?.fields
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
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId,
    createOneGenre: createOneGenre,
    updateOneGenre: updateOneGenre,
    deleteOneGenre: deleteOneGenre,
    getAllNameGenres: getAllNameGenres,
    getGenreByIdFull: getGenreByIdFull,
    getGenreFields: getGenreFields

}

export default genresRepository