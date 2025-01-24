import filmsRepository from "./filmsRepository"




async function getAllFilms(){
    const films = await filmsRepository.getAllFilms()
    console.log("service",films)
    return films
}

async function getFilmById(id: number){
    const films = await filmsRepository.getFilmById(id)
    return films
}



const filmsService = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById
}
export default filmsService