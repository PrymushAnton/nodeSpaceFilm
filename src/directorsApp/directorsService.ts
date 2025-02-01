import directorsRepository from "./directorsRepository"




async function getAllDirectors(){
    const actors = await directorsRepository.getAllDirectors()
    return actors
}

async function getDirectorById(id: number){
    const actors = await directorsRepository.getDirectorById(id)
    return actors
}






const directorsService = {
    getAllDirectors: getAllDirectors,
    getDirectorById: getDirectorById
}

export default directorsService