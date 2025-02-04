import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { dir } from "console";


async function getAllDirectors(){
    try{
        const directors = await client.director.findMany()
        return directors
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
            ...director,
            films: allFilms
        }
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

const directorsRepository = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById
}

export default directorsRepository