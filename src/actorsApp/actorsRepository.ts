import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { ActorCreatePayload, ActorDeletePayload, ActorPayload, ActorUpdatePayload } from "./types";


async function getAllActors(){
    try{
        const actors = await client.actor.findMany()
        return actors
    } catch (error){
        return (error as Error).message
    }
}

async function getPopularActors(){
    try{
        const actorObjs = await client.actorsOnFilms.groupBy({
            by: ['actorId'],
            _count: {
                actorId: true
            },
            orderBy: {
                _count: {
                    actorId: 'desc'
                }
            },
            take: 12
        })
        const ids = actorObjs.map(obj => obj.actorId)

        const actors = await client.actor.findMany({
            where: {
                id: {in: ids}
            }
        })
        return actors
    } catch (error){
        return (error as Error).message
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

        let obj = {
            ...actor as ActorPayload,
            films: allFilms
        }

        return obj

    } catch (error){
        return (error as Error).message
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
        return (error as Error).message
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
        return (error as Error).message
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

        if (isActorExists) return null

        const actor = await client.actor.create({
            data: actorData
        })

        const actorsOnFilms = await client.actorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, actorId: actor.id}
            })
        })
        return [actor, actorsOnFilms]
    } catch (error){
        return (error as Error).message
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

        const actorsOnFilms = await client.actorsOnFilms.createMany({
            data: films.map((filmId) => {
                return {filmId:+filmId, actorId: actor.id}
            })
        })

        return [actor, actorsOnFilms]
    } catch (error){
        return (error as Error).message
    }
}

async function deleteOneActor(data: ActorDeletePayload){
    try {
        const actorsOnFilms = await client.actorsOnFilms.deleteMany({
            where: {
                actorId: data.id
            }
        })

        const actor = await client.actor.delete({
            where: {
                id: data.id
            }
        })

        return [actor, actorsOnFilms]
    } catch (error){
        return (error as Error).message
    }
}


async function getActorFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "Actor")?.fields
        return fields
    } catch (error){
        return (error as Error).message
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
    getActorFields: getActorFields,
    getPopularActors: getPopularActors
}

export default actorsRepository