import actorsRepository from "./actorsRepository"
import { ActorCreatePayload, ActorDeletePayload, ActorGetPayload, ActorPayload, ActorUpdatePayload } from './types';
import { IError, ISuccess } from "../types/types";


async function getAllActors(){
    const actors = await actorsRepository.getAllActors()
    return actors
}

async function getActorById(id: number){
    const actor = await actorsRepository.getActorById(id)
    return actor
}


async function getAllNameActors(){
    const actors = await actorsRepository.getAllNameActors()
    return actors
}

async function getActorByIdFull(id: number){
    const actor = await actorsRepository.getActorByIdFull(id)

    if (!actor) return {error: "error"}
    
    
    const modifiedActor = {
        ...actor,
        films: actor.films.map((film) => {
            return film.filmId
        })
    }
    // src
    const {films, biography, ...actorData} = modifiedActor
    
    const actorObj = {
        ...Object.fromEntries(
            Object.entries(actorData).map(([key, value]) => [
                key,
                { 
                    type: typeof value === 'string' ? 'text' : typeof value,
                    data: value 
                }
            ])
        ),
        // src: {
        //     type: "image",
        //     data: src
        // }, 
        biography: {
            type: "textarea",
            data: biography
        },
        films: {
            type: "manytomany",
            data: films
        }
    }

    return actorObj
}

async function createOneActor(data: ActorCreatePayload){
    const actor = await actorsRepository.createOneActor(data)
    return actor
}

async function updateOneActor(data: ActorUpdatePayload){
    const actor = await actorsRepository.updateOneActor(data)
    return actor
}

async function deleteOneActor(data: ActorDeletePayload){
    const actor = await actorsRepository.deleteOneActor(data)
    return actor
}


const actorsService = {
    getAllActors: getAllActors,
    getActorById: getActorById,
    getAllNameActors: getAllNameActors,
    getActorByIdFull: getActorByIdFull,
    createOneActor: createOneActor,
    updateOneActor: updateOneActor,
    deleteOneActor: deleteOneActor
}

export default actorsService