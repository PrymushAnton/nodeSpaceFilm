import { Request, Response } from 'express'
import { DirectorCreatePayload, DirectorDeletePayload, DirectorUpdatePayload } from './types';
import directorsService from "./directorsService";


async function getAllDirectors(req: Request, res: Response){

    const directors = await directorsService.getAllDirectors()
    res.json(directors)

}

async function getDirectorById(req: Request, res: Response){
    const id = +req.params.id

    const director = await directorsService.getDirectorById(id)
    res.json(director)

}

async function getAllNameDirectors(req: Request, res: Response){
    
    const directors = await directorsService.getAllNameDirectors()
    res.json(directors)

}

async function getDirectorByIdFull(req: Request, res: Response){
    const id = +req.params.id

    const director = await directorsService.getDirectorByIdFull(id)
    res.json(director)
}

async function createOneDirector(req: Request, res: Response){
    const data: DirectorCreatePayload = req.body
    const director = await directorsService.createOneDirector(data)
    res.json(director)
}

async function updateOneDirector(req: Request, res: Response){
    const data: DirectorUpdatePayload = req.body
    data.id = +data.id
    data.films = data.films.map(film => +film)
    const director = await directorsService.updateOneDirector(data)
    res.json(director)
}

async function deleteOneDirector(req: Request, res: Response){
    const data: DirectorDeletePayload = req.body
    data.id = +data.id

    const director = await directorsService.deleteOneDirector(data)
    res.json(director)
}

async function getDirectorFields(req: Request, res: Response){
    const fields = await directorsService.getDirectorFields()
    res.json(fields)

}

const directorsController = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById,
    getAllNameDirectors: getAllNameDirectors,
    getDirectorByIdFull: getDirectorByIdFull,
    createOneDirector: createOneDirector,
    updateOneDirector: updateOneDirector,
    deleteOneDirector: deleteOneDirector,
    getDirectorFields: getDirectorFields
}

export default directorsController