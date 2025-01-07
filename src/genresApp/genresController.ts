import { Request, Response } from 'express'

import genresService from "./genresService";


async function getAllGenres(req: Request, res: Response){

    const genres = await genresService.getAllGenres()
    console.log(genres)
    res.json(genres)

}


const genresController = {
    getAllGenres: getAllGenres
}

export default genresController