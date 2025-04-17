import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserCreatePayload, UserDeletePayload, UserUpdatePayload, UserCreateInput } from "./types";


async function getAllUsers(){
    try{
        const users = await client.user.findMany()
        return users
    } catch (error){
        return (error as Error).message
    }
    
}

async function getAllNameUsers(){
    try{
        const users = await client.user.findMany(
            {
                select:{
                    id: true,
                    name: true
                }
            }
        )
        return users
    } catch (error){
        return (error as Error).message
    }
}

async function getUserByIdFull(id:number){
    try{
        const user = await client.user.findUnique({
            where: {
                id: id
            },
            omit: {
                id: true
            }
        })

        return user
    } catch (error){
        return (error as Error).message
    }
}
async function createOneUser(data: UserCreatePayload){

    try {

        const isUserExists = await client.user.findUnique({
            where:{
                name: data.name
            }
        })

        if (isUserExists) return null

        const user = await client.user.create({
            data: data
        })

        return user
    } catch (error){
        return (error as Error).message
    }
    
}

async function updateOneUser(data: UserUpdatePayload){

    try {
        const user = await client.user.update({
            where: {
                id: data.id
            },
            data: data
        })

        return user
    } catch (error){
        return (error as Error).message
    }
}

async function deleteOneUser(data: UserDeletePayload){
    try {
        const user = await client.user.delete({
            where: {
                id: data.id
            }
        })
        return user
    } catch (error){
        return (error as Error).message
    }
}

async function getUserFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "User")?.fields.filter(field => field.name !== "reviews")
        return fields
    } catch (error){
        return (error as Error).message
    }
}





async function findUserByEmail(email: string){
    try {
        let user = await client.user.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch(error){
        return (error as Error).message
    }
}

async function createUser(data: UserCreateInput){
    try{
        const user = await client.user.create({
            data: data
        })
        return user;
    } catch(error){
        return (error as Error).message
    }
}


async function getUserById(id: number){
    try {
        let user = await client.user.findUnique({
            where: {
                id: id
            },
            select:{
                src: true,
                email: true,
                name: true,
                role: true,
                age: true
            }
        })
        return user;
    } catch(error){
        return (error as Error).message
    }
}


async function getUserFavouriteFilms(id: number){
    try {
        // let user = await client.user.findUnique({
        //     where: {
        //         id: id
        //     },
        //     select:{
        //         FavouriteFilms: {
        //             select: {
        //                 film: {
        //                     select: {
        //                         name: true,
        //                         src: true,
        //                         description: true,
        //                         rating: true
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })

        let films = await client.film.findMany({
            where: {
                users: {
                    some: {
                        userId: id
                    }
                }
            },
            select: {
                id: true,
                name: true,
                src: true,
                description: true,
                rating: true
            }
        })

        return films
    } catch(error){
        return (error as Error).message
    }
}

async function addFavouriteFilm(userId: number, filmId: number){
    try {
        let favouriteFilm = await client.favouriteFilmsOnUsers.create({
            data: {
                userId: userId,
                filmId: filmId
            }
        })

        return favouriteFilm
    } catch(error){
        return (error as Error).message
    }
}


async function removeFavouriteFilm(userId: number, filmId: number){
    try {
        let favouriteFilm = await client.favouriteFilmsOnUsers.delete({
            where: {
                filmId_userId: {
                    userId: userId,
                    filmId: filmId
                }
            }
        })

        return favouriteFilm
    } catch(error){
        return (error as Error).message
    }
}



const usersRepository = {
    getAllUsers: getAllUsers,
    getAllNameUsers: getAllNameUsers,
    getUserByIdFull: getUserByIdFull,
    createOneUser: createOneUser,
    deleteOneUser: deleteOneUser,
    updateOneUser: updateOneUser,
    getUserFields: getUserFields,
    findUserByEmail: findUserByEmail,
    createUser: createUser,
    getUserById: getUserById,
    getUserFavouriteFilms: getUserFavouriteFilms,
    addFavouriteFilm: addFavouriteFilm,
    removeFavouriteFilm: removeFavouriteFilm
}

export default usersRepository