import { Prisma, PrismaClient } from "@prisma/client";
import client from '../client/prismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserCreatePayload, UserDeletePayload, UserUpdatePayload } from "./types";


async function getAllUsers(){
    try{
        const users = await client.user.findMany()
        return users
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
async function createOneUser(data: UserCreatePayload){

    try {

        const isUserExists = await client.user.findUnique({
            where:{
                name: data.name
            }
        })

        if (isUserExists) return {status: "error", message: "User already exists"}

        const user = await client.user.create({
            data: data
        })

        return {status: "success"}
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

async function deleteOneUser(data: UserDeletePayload){
    try {
        const user = await client.user.delete({
            where: {
                id: data.id
            }
        })
        return user
    } catch (error){
        console.log(error)
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

async function getUserFields(){
    try{
        const fields = Prisma.dmmf.datamodel.models.find(model => model.name === "User")?.fields
        return fields
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

const genresRepository = {
    getAllUsers: getAllUsers,
    getAllNameUsers: getAllNameUsers,
    getUserByIdFull: getUserByIdFull,
    createOneUser: createOneUser,
    deleteOneUser: deleteOneUser,
    updateOneUser: updateOneUser,
    getUserFields: getUserFields
}

export default genresRepository