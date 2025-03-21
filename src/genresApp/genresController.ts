import { Request, Response } from 'express'

import genresService from "./genresService";


async function getAllGenres(req: Request, res: Response){

    const genres = await genresService.getAllGenres()
    res.json(genres)

}


async function getGenresNameAndId(req: Request, res: Response){

    const genres = await genresService.getGenresNameAndId()
    res.json(genres)

}

const genresController = {
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId
}

export default genresController