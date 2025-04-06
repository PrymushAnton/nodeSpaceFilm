import { Request, Response } from "express"
import genresRepository from "./genresRepository"
import { GenreCreatePayload, GenreDeletePayload, GenrePayload, GenreUpdatePayload, GenreNamesPayload } from "./types"
import { ISuccess, IError } from "../types/types"



async function getAllGenres(): Promise<ISuccess<GenrePayload[]> | IError>{
    const genres = await genresRepository.getAllGenres()

    if (!genres) return {status: "error", message: "There are no genres"}
    if (typeof(genres) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: genres}
}

async function getGenresNameAndId(): Promise<ISuccess<GenreNamesPayload[]> | IError>{
    const genres = await genresRepository.getGenresNameAndId()

    if (!genres) return {status: "error", message: "Error while getting genres names"}
    if (typeof(genres) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: genres}

}


async function getGenreByIdFull(id: number): Promise<ISuccess<any> | IError>{
    const genre = await genresRepository.getGenreByIdFull(id)

    if (!genre) return {status: "error", message: "Error while getting full genre by id"}
    if (typeof(genre) === "string") return {status: "error", message: "Error while working with prisma"}
    
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

    return {status: "success", data: genreObj}
}

async function createOneGenre(data: GenreCreatePayload): Promise<ISuccess<string> | IError>{
    const genre = await genresRepository.createOneGenre(data)

    if (typeof(genre) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(genre)){
        for (const el of genre) {
            if (!el) {
                return {status: "error", message: "Error while creating genre"}
            }
        }
    }

    return {status: "success", data: "Genre was created successfully"}
}

async function updateOneGenre(data: GenreUpdatePayload): Promise<ISuccess<string> | IError>{
    const genre = await genresRepository.updateOneGenre(data)

    if (typeof(genre) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(genre)){
        for (const el of genre) {
            if (!el) {
                return {status: "error", message: "Error while updating genre"}
            }
        }
    }

    return {status: "success", data: "Genre was updated successfully"}
}

async function deleteOneGenre(data: GenreDeletePayload): Promise<ISuccess<string> | IError>{
    const genre = await genresRepository.deleteOneGenre(data)

    if (typeof(genre) === "string") return {status: "error", message: "Error while working with prisma"}

    if (Array.isArray(genre)){
        for (const el of genre) {
            if (!el) {
                return {status: "error", message: "Error while deleting genre"}
            }
        }
    }

    return {status: "success", data: "Genre was deleted successfully"}
}

async function getGenreFields(): Promise<ISuccess<any> | IError>{
    const fields = await genresRepository.getGenreFields()

    if (!fields) return {status: "error", message: "Error while getting genre fields"}
    if (typeof(fields) === "string") return {status: "error", message: "Error while working with prisma"}

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
    return {status: "success", data: object}
}


const genresService = {
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId,
    getGenreByIdFull: getGenreByIdFull,
    createOneGenre: createOneGenre,
    updateOneGenre: updateOneGenre,
    deleteOneGenre: deleteOneGenre,
    getGenreFields: getGenreFields,
}

export default genresService