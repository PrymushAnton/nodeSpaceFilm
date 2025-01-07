import filmsRepository from "./filmsRepository"




async function getAllFilms(){
    const films = await filmsRepository.getAllFilms()
    // console.log(films)
    return films
}


const filmsService = {
    getAllFilms: getAllFilms
}
export default filmsService