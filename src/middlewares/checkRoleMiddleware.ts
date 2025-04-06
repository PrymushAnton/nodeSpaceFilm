import { Request, Response, NextFunction } from 'express'
import usersRepository from '../userApp/userRepository'

export async function checkRoleMiddleware(req: Request, res: Response, next: NextFunction) {
    
    const id = +res.locals.userId
    const user = await usersRepository.getUserById(id)

    if (!user) {
        res.json({status: "error", message: "Error: there is no such user"})
        return
    }
    
    if (typeof(user) === "string") {
        res.json({status: "error", message: "Error while working with prisma"})
        return
    }

    if (!(user.role === "admin")) {
        res.json({status: "error", message: "Error: role is not admin"})
        return
    }

    next()
}