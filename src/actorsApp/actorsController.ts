import { Request, Response } from 'express'
import { ActorCreatePayload, ActorDeletePayload, ActorUpdatePayload } from './types';
import actorsService from "./actorsService";

async function getAllActors(req: Request, res: Response){
    const actors = await actorsService.getAllActors()
    res.json(actors)
}

async function getActorById(req: Request, res: Response){
    const id = +req.params.id
    const actor = await actorsService.getActorById(id)
    res.json(actor)
}

async function getAllNameActors(req: Request, res: Response){
    const actors = await actorsService.getAllNameActors()
    res.json(actors)
}

async function getActorByIdFull(req: Request, res: Response){
    const id = +req.params.id
    const actor = await actorsService.getActorByIdFull(id)
    res.json(actor)
}

async function createOneActor(req: Request, res: Response){
    const data: ActorCreatePayload = req.body
    const actor = await actorsService.createOneActor(data)
    res.json(actor)
}

async function updateOneActor(req: Request, res: Response){
    const data: ActorUpdatePayload = req.body
    data.id = +data.id
    data.films = data.films.map(film => +film)
    const actor = await actorsService.updateOneActor(data)
    res.json(actor)
}

async function deleteOneActor(req: Request, res: Response){
    const data: ActorDeletePayload = req.body
    data.id = +data.id
    const actor = await actorsService.deleteOneActor(data)
    res.json(actor)
}



async function getActorFields(req: Request, res: Response){
    const fields = await actorsService.getActorFields()
    res.json(fields)
}


const actorsController = {
    getAllActors: getAllActors,
    getActorById: getActorById,
    getAllNameActors: getAllNameActors,
    getActorByIdFull: getActorByIdFull,
    createOneActor: createOneActor,
    updateOneActor: updateOneActor,
    deleteOneActor: deleteOneActor,
    getActorFields: getActorFields
}

export default actorsController