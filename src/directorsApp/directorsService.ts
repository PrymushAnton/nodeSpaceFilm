import directorsRepository from "./directorsRepository"
import { DirectorCreatePayload, DirectorDeletePayload, DirectorNamesPayload, DirectorPayload, DirectorPayloadWithFilms, DirectorUpdatePayload } from './types';
import { IError, ISuccess } from "../types/types";


async function getAllDirectors(): Promise<ISuccess<DirectorPayload[]> | IError>{
    const directors = await directorsRepository.getAllDirectors()

    if (!directors) return {status: "error", message: "There are no directors"}

    if (typeof(directors) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: directors}

}

async function getDirectorById(id: number): Promise<ISuccess<DirectorPayloadWithFilms> | IError>{
    const director = await directorsRepository.getDirectorById(id)

    if (!director) return {status: "error", message: "There is no directors with such id"}

    if (typeof(director) === "string") return {status: "error", message: "Error while working with prisma"}
    
    return {status: "success", data: director}
}


async function getAllNameDirectors(): Promise<ISuccess<DirectorNamesPayload[]> | IError>{
    const directors = await directorsRepository.getAllNameDirectors()
    if (!directors) return {status: "error", message: "Error while getting directors names"}
    if (typeof(directors) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: directors}

}

async function getDirectorByIdFull(id: number): Promise<ISuccess<any> | IError>{
    const director = await directorsRepository.getDirectorByIdFull(id)
    if (!director) return {status: "error", message: "Error while getting full director by id"}

    if (typeof(director) === "string") return {status: "error", message: "Error while working with prisma"}

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

    return {status: "success", data: directorObj}

}

async function createOneDirector(data: DirectorCreatePayload): Promise<ISuccess<string> | IError>{
    const director = await directorsRepository.createOneDirector(data)
    if (!director) return {status: "error", message: "Error while creating director"}
    if (typeof(director) === "string") return {status: "error", message: "Error while working with prisma"}
    
    return {status: "success", data: "Director was created successfully"}
}

async function updateOneDirector(data: DirectorUpdatePayload){
    const director = await directorsRepository.updateOneDirector(data)
    if (!director) return {status: "error", message: "Error while updating director"}
    if (typeof(director) === "string") return {status: "error", message: "Error while working with prisma"}
    return {status: "success", data: "Director was updated successfully"}
}

async function deleteOneDirector(data: DirectorDeletePayload){

    const director = await directorsRepository.deleteOneDirector(data)
    if (!director) return {status: "error", message: "Error while deleting director"}
    if (typeof(director) === "string") return {status: "error", message: "Error while working with prisma"}
    return {status: "success", data: "Director was deleted successfully"}

}


async function getDirectorFields(): Promise<ISuccess<any> | IError>{
    const fields = await directorsRepository.getDirectorFields()

    if (!fields) return {status: "error", message: "Error while getting director fields"}
    if (typeof(fields) === "string") return {status: "error", message: "Error while working with prisma"}

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

    return {status: "success", data: object}
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