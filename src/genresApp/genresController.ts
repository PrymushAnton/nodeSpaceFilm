import { Request, Response } from 'express'

import genresService from "./genresService";


async function getAllGenres(req: Request, res: Response){

    const genres = await genresService.getAllGenres()
    res.json(genres)

}


const genresController = {
    getAllGenres: getAllGenres
}

export default genresController