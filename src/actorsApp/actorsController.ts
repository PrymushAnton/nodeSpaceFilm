import { Request, Response } from 'express'

import actorsService from "./actorsService";


async function getAllActors(req: Request, res: Response){

    const genres = await actorsService.getAllActors()
    res.json(genres)

}

async function getActorById(req: Request, res: Response){
    const id = +req.params.id

    const genres = await actorsService.getActorById(id)
    res.json(genres)

}

const actorsController = {
    getAllActors: getAllActors,
    getActorById: getActorById
}

export default actorsController