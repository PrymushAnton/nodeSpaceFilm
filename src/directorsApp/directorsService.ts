import directorsRepository from "./directorsRepository"
import { DirectorCreatePayload, DirectorDeletePayload, DirectorGetPayload, DirectorPayload, DirectorUpdatePayload } from './types';
import { IError, ISuccess } from "../types/types";


async function getAllDirectors(){
    const directors = await directorsRepository.getAllDirectors()
    return directors
}

async function getDirectorById(id: number){
    const director = await directorsRepository.getDirectorById(id)
    return director
}


async function getAllNameDirectors(){
    const directors = await directorsRepository.getAllNameDirectors()
    return directors
}

async function getDirectorByIdFull(id: number){
    const director = await directorsRepository.getDirectorByIdFull(id)

    if (!director) return {error: "error"}
    
    
    const modifiedDirector = {
        ...director,
        films: director.films.map((film) => {
            return film.filmId
        })
    }
    const {films, biography, ...directorData} = modifiedDirector
    
    const directorObj = {
        ...Object.fromEntries(
            Object.entries(directorData).map(([key, value]) => [
                key,
                { 
                    type: typeof value === 'string' ? 'text' : typeof value,
                    data: value 
                }
            ])
        ),

        biography: {
            type: "textarea",
            data: biography
        },
        films: {
            type: "manytomany",
            data: films.map(film => String(film))
        }
    }

    return directorObj
}

async function createOneDirector(data: DirectorCreatePayload){
    const director = await directorsRepository.createOneDirector(data)
    console.log(director)
    return director
}

async function updateOneDirector(data: DirectorUpdatePayload){
    const director = await directorsRepository.updateOneDirector(data)
    return director
}

async function deleteOneDirector(data: DirectorDeletePayload){

    const director = await directorsRepository.deleteOneDirector(data)
    // console.log(director)

    return director
}


async function getDirectorFields(){
    const fields = await directorsRepository.getDirectorFields()

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
    
    fields?.forEach(field => {
        if (field.name === "id") return

        object[field.name] = {
            type: field.type === "DirectorsOnFilms" 
                ? "manytomany"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "DirectorsOnFilms" 
                ? [] as number[] 
                : field.type === "Int" 
                    ? 0
                    : ""
        }

        
    })



    return object
}


const directorsService = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById,
    getAllNameDirectors: getAllNameDirectors,
    getDirectorByIdFull: getDirectorByIdFull,
    createOneDirector: createOneDirector,
    updateOneDirector: updateOneDirector,
    deleteOneDirector: deleteOneDirector,
    getDirectorFields: getDirectorFields
}

export default directorsService