import filmsRepository from "./filmsRepository"




async function getAllFilms(){
    const films = await filmsRepository.getAllFilms()
    return films
}

async function getFilmById(id: number){
    const films = await filmsRepository.getFilmById(id)
    return films
}


async function getFilmsNameAndId(){
    const films = await filmsRepository.getFilmsNameAndId()
    return films
}




const filmsService = {
    getAllFilms: getAllFilms,
    getFilmById: getFilmById,
    getFilmsNameAndId: getFilmsNameAndId
}
export default filmsService