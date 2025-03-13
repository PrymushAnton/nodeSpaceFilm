import actorsRepository from "./actorsRepository"
import { ActorCreatePayload, ActorDeletePayload, ActorPayload, ActorUpdatePayload } from './types';
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
    return actor
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