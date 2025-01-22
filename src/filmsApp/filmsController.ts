import { Request, Response } from 'express'

import filmsService from "./filmsService";


async function getAllFilms(req: Request, res: Response){

    const films = await filmsService.getAllFilms()
    console.log(films)
    res.json(films)

}


async function getFilmById(req: Request, res: Response){

    const id = +req.params.id
    const film = await filmsService.getFilmById(id)
    res.json(film)

}


const filmsController = {
    getAllFilms: getAllFilms
}

export default filmsController