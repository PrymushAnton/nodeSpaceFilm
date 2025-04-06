import actorsRepository from "./actorsRepository"
import { ActorCreatePayload, ActorDeletePayload, ActorNamesPayload, ActorPayload, ActorPayloadWithFilms, ActorUpdatePayload } from './types';
import { IError, ISuccess } from "../types/types";


async function getAllActors(): Promise<ISuccess<ActorPayload[]> | IError>{
    const actors = await actorsRepository.getAllActors()

    if (!actors) return {status: "error", message: "There are no actors"}
    if (typeof(actors) === "string") return {status: "error", message: "Error while working with prisma"}
    
    return {status: "success", data: actors}
}

async function getActorById(id: number): Promise<ISuccess<ActorPayloadWithFilms> | IError>{
    const actor = await actorsRepository.getActorById(id)

    if (!actor) return {status: "error", message: "There is no actor with such id"}
    if (typeof(actor) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: actor}
}


async function getAllNameActors(): Promise<ISuccess<ActorNamesPayload[]> | IError>{
    const actors = await actorsRepository.getAllNameActors()
    if (!actors) return {status: "error", message: "Error while getting actors names"}
    if (typeof(actors) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: actors}
}

async function getActorByIdFull(id: number): Promise<ISuccess<any> | IError>{
    const actor = await actorsRepository.getActorByIdFull(id)

    if (!actor) return {status: "error", message: "Error while getting full actor by id"}
    if (typeof(actor) === "string") return {status: "error", message: "Error while working with prisma"}
    
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

    return {status: "success", data: actorObj}
}

async function createOneActor(data: ActorCreatePayload): Promise<ISuccess<string> | IError>{
    const actor = await actorsRepository.createOneActor(data)

    if (typeof(actor) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(actor)){
        for (const el of actor) {
            if (!el) {
                return {status: "error", message: "Error while creating actor"}
            }
        }
    }

    return {status: "success", data: "Actor was created successfully"}
}

async function updateOneActor(data: ActorUpdatePayload): Promise<ISuccess<string> | IError>{
    const actor = await actorsRepository.updateOneActor(data)

    if (typeof(actor) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(actor)){
        for (const el of actor) {
            if (!el) {
                return {status: "error", message: "Error while updating actor"}
            }
        }
    }

    return {status: "success", data: "Actor was updated successfully"}
}

async function deleteOneActor(data: ActorDeletePayload): Promise<ISuccess<string> | IError>{
    const actor = await actorsRepository.deleteOneActor(data)

    if (typeof(actor) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(actor)){
        for (const el of actor) {
            if (!el) {
                return {status: "error", message: "Error while deleting actor"}
            }
        }
    }

    return {status: "success", data: "Actor was deleted successfully"}
}


async function getActorFields(): Promise<ISuccess<any> | IError>{
    const fields = await actorsRepository.getActorFields()

    if (!fields) return {status: "error", message: "Error while getting actor fields"}
    if (typeof(fields) === "string") return {status: "error", message: "Error while working with prisma"}

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
    return {status: "success", data: object}
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