import genresRepository from "./genresRepository"




async function getAllGenres(){
    const genres = await genresRepository.getAllGenres()
    // console.log(films)
    return genres
}


const genresService = {
    getAllGenres: getAllGenres
}

export default genresService