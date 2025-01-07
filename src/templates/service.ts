import repository from "../filmsApp/filmsRepository"




async function getAllFilms(){
    const films = await repository.getAllFilms()
    // console.log(films)
    return films
}


const service = {
    getAllFilms: getAllFilms
}
export default service