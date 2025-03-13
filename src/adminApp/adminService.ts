import adminRepository from "./adminRepository"


async function getAllModels(){
    const models = await adminRepository.getAllModels()
    return models
}


const adminService = {
    getAllModels: getAllModels,
}

export default adminService