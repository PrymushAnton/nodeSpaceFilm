import filmsRepository from "./filmsRepository"
import { FilmCreatePayload, FilmDeletePayload, FilmUpdatePayload } from "./types"




async function getAllFilms(){
    const films = await filmsRepository.getAllFilms()
    return films
}

async function getFilmById(id: number){
    const films = await filmsRepository.getFilmById(id)
    return films
}


async function getFilmsNameAndId(){
    const films = await filmsRepository.getFilmsNameAndId()
    const newFilms = films?.map(film => {return {id: String(film.id), name: film.name}})
    return newFilms
}


async function getFilmByIdFull(id: number){
    const film = await filmsRepository.getFilmByIdFull(id)

    if (!film) return {error: "error"}
    
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

    return filmObj
}




async function getFilmFields(){
    const fields = await filmsRepository.getFilmFields()

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

    return object
}


async function createOneFilm(data: FilmCreatePayload){
    const film = await filmsRepository.createOneFilm(data)
    return film
}

async function updateOneFilm(data: FilmUpdatePayload){
    const film = await filmsRepository.updateOneFilm(data)
    return film
}

async function deleteOneFilm(data: FilmDeletePayload){
    const film = await filmsRepository.deleteOneFilm(data)
    return film
}


const filmsService = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId,
    getFilmByIdFull: getFilmByIdFull,
    getFilmFields: getFilmFields,
    createOneFilm: createOneFilm,
    updateOneFilm: updateOneFilm,
    deleteOneFilm: deleteOneFilm
}
export default filmsService