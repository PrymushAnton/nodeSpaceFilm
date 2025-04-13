import { Request, Response } from 'express'

import filmsService from "./filmsService";
import { FilmCreatePayload, FilmDeletePayload, FilmUpdatePayload } from './types';


async function getAllFilms(req: Request, res: Response){
    const films = await filmsService.getAllFilms()
    res.json(films)
}


async function getFourFilms(req: Request, res: Response){
    const films = await filmsService.getFourFilms()
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

async function getFilmByIdFull(req: Request, res: Response){
    const id = +req.params.id

    const film = await filmsService.getFilmByIdFull(id)
    res.json(film)
}

async function getFilmFields(req: Request, res: Response){
    console.log(1231231231)
    const fields = await filmsService.getFilmFields()
    res.json(fields)
}

async function createOneFilm(req: Request, res: Response){
    const data: FilmCreatePayload = req.body
    data.rating = +data.rating
    data.year = +data.year
    const film = await filmsService.createOneFilm(data)
    res.json(film)
}


async function updateOneFilm(req: Request, res: Response){
    const data: FilmUpdatePayload = req.body

    data.id = +data.id
    data.actors = data.actors.map(actor => +actor)
    data.directors = data.directors.map(director => +director)
    data.genres = data.genres.map(genre => +genre)
    data.year = +data.year
    data.rating = +data.rating

    const film = await filmsService.updateOneFilm(data)
    res.json({status: "update"})
}

async function deleteOneFilm(req: Request, res: Response){
    const data: FilmDeletePayload = req.body
    data.id = +data.id

    const film = await filmsService.deleteOneFilm(data)
    res.json({status: "delete"})
}


const filmsController = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId,
    getFilmByIdFull: getFilmByIdFull,
    getFilmFields: getFilmFields,
    createOneFilm: createOneFilm,
    updateOneFilm: updateOneFilm,
    deleteOneFilm: deleteOneFilm,
    getFourFilms: getFourFilms
}

export default filmsController