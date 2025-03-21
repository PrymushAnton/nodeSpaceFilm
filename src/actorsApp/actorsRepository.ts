import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ActorCreatePayload, ActorDeletePayload, ActorUpdatePayload } from "./types";


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

async function getAllNameActors(){
    try{
        const actors = await client.actor.findMany(
            {
                select:{
                    id: true,
                    name: true
                }
            }
        )
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


async function getActorByIdFull(id:number){
    try{
        const actor = await client.actor.findUnique({
            where: {
                id: id
            },
            include: {
                films: {
                    omit: {
                        actorId: true
                    }
                }
            },
            omit: {
                id: true
            }
        })

        return actor
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






async function createOneActor(data: ActorCreatePayload){
    const {films, ...actorData} = data

    try {

        const isActorExists = await client.actor.findUnique({
            where:{
                name: actorData.name
            }
        })

        if (isActorExists) return {status: "error", message: "Actor already exists"}

        const actor = await client.actor.create({
            data: actorData
        })


        const actorsOnFilms = await client.actorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, actorId: actor.id}
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

async function updateOneActor(data: ActorUpdatePayload){
    const {films, ...actorData} = data

    try {
        const actor = await client.actor.update({
            where: {
                id: +actorData.id
            },
            data: actorData
        })

        await client.actorsOnFilms.deleteMany({
            where: {
                actorId: +actorData.id
            }
        })

        await client.actorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, actorId: actor.id}
            })
        })

        return actor
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

async function deleteOneActor(data: ActorDeletePayload){
    console.log(data)
    try {
        await client.actorsOnFilms.deleteMany({
            where: {
                actorId: data.id
            }
        })

        const actor = await client.actor.delete({
            where: {
                id: data.id
            }
        })
        console.log(actor)

        

        return actor
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


async function getActorFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Actor")?.fields
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

const actorsRepository = {
    getAllActors: getAllActors,
    getActorById: getActorById,
    getAllNameActors: getAllNameActors,
    getActorByIdFull: getActorByIdFull,
    createOneActor: createOneActor,
    updateOneActor: updateOneActor,
    deleteOneActor: deleteOneActor,
    getActorFields: getActorFields
}

export default actorsRepository