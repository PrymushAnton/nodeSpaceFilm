import { Request, Response } from 'express'

import usersService from "./userService";
import { UserCreatePayload, UserDeletePayload, UserUpdatePayload } from './types';


async function getAllUsers(req: Request, res: Response){
    const users = await usersService.getAllUsers()
    res.json(users)
}

async function getAllNameUsers(req: Request, res: Response){
    const users = await usersService.getAllNameUsers()
    res.json(users)
}

async function getUserByIdFull(req: Request, res: Response){
    const id = +req.params.id
    const user = await usersService.getUserByIdFull(id)
    res.json(user)
}

async function createOneUser(req: Request, res: Response){
    const data: UserCreatePayload = req.body
    const user = await usersService.createOneUser(data)
    res.json(user)
}

async function updateOneUser(req: Request, res: Response){
    const data: UserUpdatePayload = req.body
    data.id = +data.id
    const user = await usersService.updateOneUser(data)
    res.json({status: "update"})
}

async function deleteOneUser(req: Request, res: Response){
    const data: UserDeletePayload = req.body
    data.id = +data.id
    const user = await usersService.deleteOneUser(data)
    res.json({status: "delete"})
}



async function getUserFields(req: Request, res: Response){
    const fields = await usersService.getUserFields()
    res.json(fields)
}


const usersController = {
    getAllUsers: getAllUsers,
    getAllNameUsers: getAllNameUsers,
    getUserByIdFull: getUserByIdFull,
    createOneUser: createOneUser,
    updateOneUser: updateOneUser,
    deleteOneUser: deleteOneUser,
    getUserFields: getUserFields
}

export default usersController