import { IError, ISuccess } from "../types/types"
import filmsRepository from "./filmsRepository"
import { FilmNamesPayload, FilmCreatePayload, FilmDeletePayload, FilmPayloadWithActorsGenresReviews, FilmUpdatePayload, FilmPayload } from "./types"



async function getAllFilms(): Promise<ISuccess<FilmPayloadWithActorsGenresReviews[]> | IError>{
    const films = await filmsRepository.getAllFilms()
    if (!films) return {status: "error", message: "There are no films"}
    if (typeof(films) === "string") return {status: "error", message: "Error while working with prisma"}
    return {status: "success", data: films}
}

async function getFourFilms(): Promise<ISuccess<FilmPayload[]> | IError>{
    const films = await filmsRepository.getFourFilms()
    if (!films) return {status: "error", message: "There are no films"}
    if (typeof(films) === "string") return {status: "error", message: "Error while working with prisma"}
    return {status: "success", data: films}
}


async function getFilmById(id: number): Promise<ISuccess<FilmPayloadWithActorsGenresReviews> | IError>{
    const films = await filmsRepository.getFilmById(id)
    if (!films) return {status: "error", message: "There are no films"}
    if (typeof(films) === "string") return {status: "error", message: "Error while working with prisma"}
    return {status: "success", data: films}
}

async function getFilmsNameAndId(): Promise<ISuccess<FilmNamesPayload[]> | IError>{
    const films = await filmsRepository.getFilmsNameAndId()

    if (!films) return {status: "error", message: "Error while getting films names"}
    if (typeof(films) === "string") return {status: "error", message: "Error while working with prisma"}

    // String(film.id)
    const newFilms = films?.map(film => {return {id: film.id, name: film.name}})
    return {status: "success", data: newFilms}

}


async function getFilmByIdFull(id: number): Promise<ISuccess<any> | IError>{
    const film = await filmsRepository.getFilmByIdFull(id)

    if (!film) return {status: "error", message: "Error while getting full film by id"}
    if (typeof(film) === "string") return {status: "error", message: "Error while working with prisma"}
    
    const modifiedFilm = {
        ...film,
        actors: film.actors.map((actor) => {
            return actor.actorId
        }),
        directors: film.directors.map((director) => {
            return director.directorId
        }),
        genres: film.genres.map((genre) => {
            return genre.genreId
        })
    }
    const {actors, description, genres, directors, ...actorData} = modifiedFilm
    
    const filmObj = {
        ...Object.fromEntries(
            Object.entries(actorData).map(([key, value]) => [
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
        actors: {
            type: "manytomany",
            data: actors.map(actor => String(actor))
        },
        directors: {
            type: "manytomany",
            data: directors.map(director => String(director))
        },
        genres: {
            type: "manytomany",
            data: genres.map(genre => String(genre))
        }
    }

    return {status: "success", data: filmObj}

}


async function getFilmFields(): Promise<ISuccess<any> | IError>{
    const fields = await filmsRepository.getFilmFields()

    if (!fields) return {status: "error", message: "Error while getting film fields"}
    if (typeof(fields) === "string") return {status: "error", message: "Error while working with prisma"}

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
    
    fields?.forEach(field => {
        if (field.name === "id") return

        object[field.name] = {
            type: field.type === "GenresOnFilms" || field.type === "ActorsOnFilms" || field.type === "DirectorsOnFilms"
                ? "manytomany"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "GenresOnFilms" || field.type === "ActorsOnFilms" || field.type === "DirectorsOnFilms" || field.type === "Review"
                ? [] as number[]
                : field.type === "Int" 
                    ? 0
                    : ""
        }
        
    })

    return {status: "success", data: object}

}


async function createOneFilm(data: FilmCreatePayload): Promise<ISuccess<string> | IError>{
    const film = await filmsRepository.createOneFilm(data)

    if (typeof(film) === "string") return {status: "error", message: "Error while working with prisma"}

    if (!film) return {status: "error", message: "Error while creating film"}
    if (Array.isArray(film)){
        for (const el of film) {
            if (!el) {
                return {status: "error", message: "Error while creating film2"}
            }
        }
    }


    return {status: "success", data: "Actor was created successfully"}
}

async function updateOneFilm(data: FilmUpdatePayload): Promise<ISuccess<string> | IError>{
    const film = await filmsRepository.updateOneFilm(data)
    
    if (!film) return {status: "error", message: "Error while updating film"}
    if (typeof(film) === "string") return {status: "error", message: "Error while working with prisma"}
    
    return {status: "success", data: "Actor was updated successfully"}
}

async function deleteOneFilm(data: FilmDeletePayload): Promise<ISuccess<string> | IError>{
    const film = await filmsRepository.deleteOneFilm(data)

    if (!film) return {status: "error", message: "Error while deleting film"}
    if (typeof(film) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: "Actor was deleted successfully"}
}


const filmsService = {
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
export default filmsService