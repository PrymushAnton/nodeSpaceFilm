import userRepository from "./userRepository"
import { UserCreatePayload, UserDeletePayload, UserUpdatePayload } from "./types"


async function getAllUsers(){
    const users = await userRepository.getAllUsers()
    return users
}


async function getAllNameUsers(){
    const users = await userRepository.getAllNameUsers()
    return users
}


async function getUserByIdFull(id: number){
    const user = await userRepository.getUserByIdFull(id)

    if (!user) return {error: "error"}
    
    
    const userObj = {
        ...Object.fromEntries(
            Object.entries(user).map(([key, value]) => [
                key,
                { 
                    type: typeof value === 'string' ? 'text' : typeof value,
                    data: value 
                }
            ])
        )
    }
	
    return userObj
}

async function createOneUser(data: UserCreatePayload){
    const user = await userRepository.createOneUser(data)
    return user
}

async function updateOneUser(data: UserUpdatePayload){
    const user = await userRepository.updateOneUser(data)
    return user
}

async function deleteOneUser(data: UserDeletePayload){
    const user = await userRepository.deleteOneUser(data)
    return user
}


async function getUserFields(){
    const fields = await userRepository.getUserFields()

    interface LooseObject {
        [key: string]: any
    }
    const object: LooseObject = {}
	console.log(fields)
    
    fields?.forEach(field => {
        if (field.name === "id") return
        if (field.name === "film") return
        if (field.name === "user") return

        object[field.name] = {
            type: field.name === "userId" || field.name === "filmId" 
                ? "manytoone"
                : field.type === "Int" 
                    ? "number" 
                    : field.type === "String"
                        ? "text"
                        : field.type.toLowerCase(),
            data: field.type === "userId" || field.type === "filmId"
                ? 0 
                : field.type === "Int" 
                    ? 0
                    : ""
        }
    })
	console.log(object)

    return object
}
const genresService = {
    getAllUsers: getAllUsers,
    getAllNameUsers: getAllNameUsers,
    getUserByIdFull: getUserByIdFull,
    createOneUser: createOneUser,
    deleteOneUser: deleteOneUser,
    updateOneUser: updateOneUser,
    getUserFields: getUserFields
}

export default genresService