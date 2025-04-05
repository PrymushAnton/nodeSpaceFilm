import { Request, Response } from "express"
import genresRepository from "./genresRepository"
import { GenreCreatePayload, GenreDeletePayload, GenreUpdatePayload } from "./types"




async function getAllGenres(){
    const genres = await genresRepository.getAllGenres()
    return genres
}


async function getGenresNameAndId(){
    const genres = await genresRepository.getGenresNameAndId()
    return genres
}

async function getAllNameGenres(){
    const actors = await genresRepository.getAllNameGenres()
    return actors
}


async function getGenreByIdFull(id: number){
    const genre = await genresRepository.getGenreByIdFull(id)

    if (!genre) return {error: "error"}
    
    
    const modifiedGenre = {
        ...genre,
        films: genre.films.map((film) => {
            return film.filmId
        })
    }
    const {films, description, ...genreData} = modifiedGenre
    
    const genreObj = {
        ...Object.fromEntries(
            Object.entries(genreData).map(([key, value]) => [
                key,
                { 
                    type: typeof value === 'string' ? 'text' : typeof value,
                    data: value 
                }
            ])
        ),
        description: {
            type: "textarea",
            data: description
        },
        films: {
            type: "manytomany",
            data: films.map(film => String(film))
        }
    }

    return genreObj
}

async function createOneGenre(data: GenreCreatePayload){
    const genre = await genresRepository.createOneGenre(data)
    return genre
}

async function updateOneGenre(data: GenreUpdatePayload){
    const genre = await genresRepository.updateOneGenre(data)
    return genre
}

async function deleteOneGenre(data: GenreDeletePayload){
    const genre = await genresRepository.deleteOneGenre(data)
    return genre
}

async function getGenreFields(){
    const fields = await genresRepository.getGenreFields()

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
    
    fields?.forEach(field => {
        if (field.name === "id") return

        object[field.name] = {
            type: field.type === "GenresOnFilms" 
                ? "manytomany"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "GenresOnFilms" 
                ? [] as number[] 
                : field.type === "Int" 
                    ? 0
                    : ""
        }

        
    })
    return object
}


const genresService = {
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId,
    getGenreByIdFull: getGenreByIdFull,
    createOneGenre: createOneGenre,
    updateOneGenre: updateOneGenre,
    deleteOneGenre: deleteOneGenre,
    getGenreFields: getGenreFields,
    getAllNameGenres: getAllNameGenres
}

export default genresService