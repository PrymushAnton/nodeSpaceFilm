import genresRepository from "./genresRepository"




async function getAllGenres(){
    const genres = await genresRepository.getAllGenres()
    // console.log(films)
    return genres
}


async function getGenresNameAndId(){
    const genres = await genresRepository.getGenresNameAndId()
    // console.log(films)
    return genres
}


const genresService = {
    getAllGenres: getAllGenres,
    getGenresNameAndId: getGenresNameAndId
}

export default genresService