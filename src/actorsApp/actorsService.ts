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

        biography: {
            type: "textarea",
            data: biography
        },
        films: {
            type: "manytomany",
            data: films.map(film => String(film))
        }
    }

    return actorObj
}

async function createOneActor(data: ActorCreatePayload){
    const actor = await actorsRepository.createOneActor(data)
    console.log(actor)
    return actor
}

async function updateOneActor(data: ActorUpdatePayload){
    const actor = await actorsRepository.updateOneActor(data)
    return actor
}

async function deleteOneActor(data: ActorDeletePayload){

    const actor = await actorsRepository.deleteOneActor(data)
    // console.log(actor)

    return actor
}


async function getActorFields(){
    const fields = await actorsRepository.getActorFields()

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
    
    fields?.forEach(field => {
        if (field.name === "id") return

        object[field.name] = {
            type: field.type === "ActorsOnFilms" 
                ? "manytomany"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "ActorsOnFilms" 
                ? [] as number[] 
                : field.type === "Int" 
                    ? 0
                    : ""
        }

        
    })
    return object
}


const actorsService = {
    getAllActors: getAllActors,
    getActorById: getActorById,
    getAllNameActors: getAllNameActors,
    getActorByIdFull: getActorByIdFull,
    createOneActor: createOneActor,
    updateOneActor: updateOneActor,
    deleteOneActor: deleteOneActor,
    getActorFields: getActorFields
}

export default actorsService