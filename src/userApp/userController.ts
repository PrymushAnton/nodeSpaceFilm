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
    data.age = +data.age
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


async function authUser(req: Request, res: Response){
    const data = req.body
    const result = await usersService.authUser(data.email, data.password)
    
    res.json(result)
}

async function registerUser(req: Request, res: Response){
    const data = req.body
    const result = await usersService.registerUser(data)

    res.json(result)
}

async function getUserById(req: Request, res: Response){
    const id = res.locals.userId
    const result = await usersService.getUserById(id)
    res.json(result)
}

async function getUserFavouriteFilms(req: Request, res: Response){
    const id = res.locals.userId
    const result = await usersService.getUserFavouriteFilms(id)
    res.json(result)
}


async function addFavouriteFilm(req: Request, res: Response){
    const userId = res.locals.userId
    const {filmId} = req.body
    const result = await usersService.addFavouriteFilm(userId, filmId)
    res.json(result)
}

async function removeFavouriteFilm(req: Request, res: Response){
    const userId = res.locals.userId
    const {filmId} = req.body
    const result = await usersService.removeFavouriteFilm(userId, filmId)
    res.json(result)
}

async function isFavourite(req: Request, res: Response){
    const userId = res.locals.userId
    const {id} = req.params
    const result = await usersService.isFavourite(userId, +id)
    res.json(result)
}

async function changePassword(req: Request, res: Response){
    const userId = res.locals.userId
    const {password} = req.body
    const result = await usersService.changePassword(userId, password)
    res.json(result)
}

async function changeData(req: Request, res: Response){
    const userId = res.locals.userId
    const {data} = req.body
    const result = await usersService.changeData(userId, data)
    res.json(result)
}

const usersController = {
    getAllUsers: getAllUsers,
    getAllNameUsers: getAllNameUsers,
    getUserByIdFull: getUserByIdFull,
    createOneUser: createOneUser,
    updateOneUser: updateOneUser,
    deleteOneUser: deleteOneUser,
    getUserFields: getUserFields,
    authUser: authUser,
    registerUser: registerUser,
    getUserById: getUserById,
    getUserFavouriteFilms: getUserFavouriteFilms,
    addFavouriteFilm: addFavouriteFilm,
    removeFavouriteFilm: removeFavouriteFilm,
    isFavourite: isFavourite,
    changePassword: changePassword,
    changeData: changeData
}

export default usersController