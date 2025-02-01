import { Request, Response } from 'express'

import directorsService from "./directorsService";


async function getAllDirectors(req: Request, res: Response){

    const genres = await directorsService.getAllDirectors()
    res.json(genres)

}

async function getDirectorById(req: Request, res: Response){
    const id = +req.params.id

    const genres = await directorsService.getDirectorById(id)
    res.json(genres)

}

const directorsController = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById
}

export default directorsController