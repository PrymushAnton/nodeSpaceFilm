import { Request, Response } from 'express'

import adminService from "./adminService";


async function getAllModels(req: Request, res: Response){
    const models = await adminService.getAllModels()
    res.json(models)
}


const adminController = {
    getAllModels: getAllModels,
}

export default adminController