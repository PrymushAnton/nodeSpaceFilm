import { Prisma } from "@prisma/client";

async function getAllModels(){
    try{
        const models = Prisma.dmmf.datamodel.models.map((model) => {return model.name}).filter((model) => {return !(model.includes("On"))})
        return models
    } catch (error){
        return (error as Error).message
    }
}

const adminRepository = {
    getAllModels
}

export default adminRepository