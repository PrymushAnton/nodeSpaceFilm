import genresRepository from "./reviewRepository"




async function getAllGenres(){
    const genres = await genresRepository.getAllGenres()
    // console.log(films)
    return genres
}


async function getReviewsNameAndId(){
    const genres = await genresRepository.getReviewsNameAndId()
    // console.log(films)
    return genres
}


const genresService = {
    getAllGenres: getAllGenres,
    getReviewsNameAndId: getReviewsNameAndId
}

export default genresService