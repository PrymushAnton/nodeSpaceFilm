import { Request, Response } from 'express'

import filmsService from "./filmsService";


async function getAllFilms(req: Request, res: Response){
    const films = await filmsService.getAllFilms()
    res.json(films)
}


async function getFilmById(req: Request, res: Response){
    const id = +req.params.id
    const film = await filmsService.getFilmById(id)
    res.json(film)
}

async function getFilmsNameAndId(req: Request, res: Response){
    const films = await filmsService.getFilmsNameAndId()
    res.json(films)
}


const filmsController = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId
}

export default filmsController