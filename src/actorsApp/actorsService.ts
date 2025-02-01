import actorsRepository from "./actorsRepository"




async function getAllActors(){
    const actors = await actorsRepository.getAllActors()
    return actors
}

async function getActorById(id: number){
    const actors = await actorsRepository.getActorById(id)
    return actors
}






const actorsService = {
    getAllActors: getAllActors,
    getActorById: getActorById
}

export default actorsService