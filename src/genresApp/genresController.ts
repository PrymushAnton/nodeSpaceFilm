import { Request, Response } from 'express'

import genresService from "./genresService";
import { GenreCreatePayload, GenreDeletePayload, GenreUpdatePayload } from './types';


async function getAllGenres(req: Request, res: Response){
    const genres = await genresService.getAllGenres()
    res.json(genres)
}


async function getGenresNameAndId(req: Request, res: Response){
    const genres = await genresService.getGenresNameAndId()
    res.json(genres)
}


async function getGenreByIdFull(req: Request, res: Response){
    const id = +req.params.id

    const genre = await genresService.getGenreByIdFull(id)
    res.json(genre)
}

async function createOneGenre(req: Request, res: Response){
    const data: GenreCreatePayload = req.body
    const genre = await genresService.createOneGenre(data)
    res.json(genre)
}

async function updateOneGenre(req: Request, res: Response){
    const data: GenreUpdatePayload = req.body
    data.id = +data.id
    data.films = data.films.map(film => +film)
    const genre = await genresService.updateOneGenre(data)
    res.json({status: "update"})
}

async function deleteOneGenre(req: Request, res: Response){
    const data: GenreDeletePayload = req.body
    data.id = +data.id
    const genre = await genresService.deleteOneGenre(data)
    res.json({status: "delete"})
}

async function getGenreFields(req: Request, res: Response){
    const fields = await genresService.getGenreFields()
    res.json(fields)

}


const genresController = {
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId,
    getGenreByIdFull: getGenreByIdFull,
    createOneGenre: createOneGenre,
    updateOneGenre: updateOneGenre,
    deleteOneGenre: deleteOneGenre,
    getGenreFields: getGenreFields,
}

export default genresController