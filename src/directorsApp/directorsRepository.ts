import { Prisma } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DirectorCreatePayload, DirectorDeletePayload, DirectorPayload, DirectorUpdatePayload } from "./types";



async function getAllDirectors(){
    try{
        const directors = await client.director.findMany()
        return directors
    } catch (error){
        return (error as Error).message
    }
    
}



async function getDirectorById(id:number){
    try{
        const director = await client.director.findUnique({
            where: {
                id: id
            }
        })
        let directorsOnFilms = await client.directorsOnFilms.findMany({
            where: {
                directorId: director?.id
            }
        })


        let allFilms = await client.film.findMany()
        allFilms = allFilms.filter((film) => {
            return directorsOnFilms.some((obj) => {
                return film.id === obj.filmId
            })
        })

        return {
            ...director as DirectorPayload,
            films: allFilms
        }
    } catch (error){
        return (error as Error).message
    }
}

async function getAllNameDirectors(){
    try{
        const directors = await client.director.findMany(
            {
                select:{
                    id: true,
                    name: true
                }
            }
        )
        return directors
    } catch (error){
        return (error as Error).message
    }
}


async function getDirectorByIdFull(id:number){
    try{
        const director = await client.director.findUnique({
            where: {
                id: id
            },
            include: {
                films: {
                    omit: {
                        directorId: true
                    }
                }
            },
            omit: {
                id: true
            }
        })

        return director
    } catch (error){
        return (error as Error).message
    }
}






async function createOneDirector(data: DirectorCreatePayload){
    const {films, ...directorData} = data

    try {

        const isDirectorExists = await client.director.findUnique({
            where:{
                name: directorData.name
            }
        })

        if (isDirectorExists) return {status: "error", message: "Director already exists"}

        const director = await client.director.create({
            data: directorData
        })

        console.log("repos", director)

        const directorsOnFilms = await client.directorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, directorId: director.id}
            })
        })
        return {status: "success"}
    } catch (error){
        return (error as Error).message
    }
    
}

async function updateOneDirector(data: DirectorUpdatePayload){
    const {films, ...directorData} = data

    try {
        const director = await client.director.update({
            where: {
                id: +directorData.id
            },
            data: directorData
        })

        await client.directorsOnFilms.deleteMany({
            where: {
                directorId: +directorData.id
            }
        })

        await client.directorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, directorId: director.id}
            })
        })

        return director
    } catch (error){
        return (error as Error).message
    }
}

async function deleteOneDirector(data: DirectorDeletePayload){
    console.log(data)
    try {
        await client.directorsOnFilms.deleteMany({
            where: {
                directorId: data.id
            }
        })

        const director = await client.director.delete({
            where: {
                id: data.id
            }
        })
        console.log(director)

        

        return director
    } catch (error){
        console.log(error)
        return (error as Error).message
    }
}


async function getDirectorFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Director")?.fields
        return fields
    } catch (error){
        return (error as Error).message
    }
}

const directorRepository = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById,
    getAllNameDirectors: getAllNameDirectors,
    getDirectorByIdFull: getDirectorByIdFull,
    createOneDirector: createOneDirector,
    updateOneDirector: updateOneDirector,
    deleteOneDirector: deleteOneDirector,
    getDirectorFields: getDirectorFields
}

export default directorRepository