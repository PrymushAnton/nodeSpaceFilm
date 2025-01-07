import { Request, Response } from 'express'

import filmsService from "./filmsService";


async function getAllFilms(req: Request, res: Response){

    const films = await filmsService.getAllFilms()
    console.log(films)
    res.json(films)

}


const filmsController = {
    getAllFilms: getAllFilms
}

export default filmsController