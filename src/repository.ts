import { Prisma, PrismaClient } from "@prisma/client";
import client from './client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


interface IJsonResponse{
    "categories":{
        "genres": String[]
    },
    "src": String,
    "name": String,
    "description": String,
    "rating": Number
}


async function getAllFilms(){
    try{
        const films = await client.film.findMany()
        const genres = await client.genre.findMany()
        const genresOnFilms = await client.genresOnFilms.findMany()
        
        let jsonResponse: IJsonResponse[] = []
        
        
        films.forEach((film) => {
            let genresOfFilmIds = genresOnFilms
            let genresOfFilmsNames = genres

            genresOfFilmIds = genresOfFilmIds.filter((pair) => {
                return film.id == pair.filmId;
            })

            let genresNames = <string[]>[]

            genresOfFilmIds.forEach((pair) => {
                genresOfFilmsNames.forEach((genre) => {
                    if (genre.id == pair.genreId){
                        genresNames.push(genre.name)
                    }
                }) 
            })

            
            jsonResponse.push({
                "categories":{
                    "genres": genresNames
                },
                "src": film.src,
                "name": film.name,
                "description": film.description,
                "rating": film.rating
            })
            
        })
        return jsonResponse

    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
    
}




const repository = {
    getAllFilms: getAllFilms
}

export default repository