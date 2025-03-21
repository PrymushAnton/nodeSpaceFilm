import { Request, Response } from 'express'

import genresService from "./reviewService";


async function getAllGenres(req: Request, res: Response){

    const genres = await genresService.getAllGenres()
    res.json(genres)

}


async function getReviewsNameAndId(req: Request, res: Response){

    const genres = await genresService.getReviewsNameAndId()
    res.json(genres)

}

const genresController = {
    getAllGenres: getAllGenres,
    getReviewsNameAndId: getReviewsNameAndId
}

export default genresController