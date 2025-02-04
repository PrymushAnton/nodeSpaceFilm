import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


async function getAllActors(){
    try{
        const actors = await client.actor.findMany()
        return actors
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



async function getActorById(id:number){
    try{
        const actor = await client.actor.findUnique({
            where: {
                id: id
            }
        })
        let actorsOnFilms = await client.actorsOnFilms.findMany({
            where: {
                actorId: actor?.id
            }
        })


        let allFilms = await client.film.findMany()
        allFilms = allFilms.filter((film) => {
            return actorsOnFilms.some((obj) => {
                return film.id === obj.filmId
            })
        })

        return {
            ...actor,
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

const actorsRepository = {
    getAllActors: getAllActors,
    getActorById: getActorById
}

export default actorsRepository