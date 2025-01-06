import { Request, Response } from 'express'

import service from "./service";


async function getAllFilms(req: Request, res: Response){

    const films = await service.getAllFilms()
    
    res.json(films)

}


const controller = {
    getAllFilms: getAllFilms
}

export default controller