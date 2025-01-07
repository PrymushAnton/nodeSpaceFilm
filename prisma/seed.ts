import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


const prisma = new PrismaClient();

// async function createOneFilm(){
//     const film = await prisma.film.create({
//         data: {
//             name: 'Red One',
//             rating: 87,
//             year: 2024,
//             baseLanguage: "English",
//             homeCountry: "USA",
//             ageRestriction: "PG-13"
//         }
//     })
// }

async function createManyGenres(){
    const genres = await prisma.genre.createMany({
        data: [
            {
                name: "Фентезі",
                description: "Фентезі - це літературний жанр, в якому магія та інші надприродні  явища  є  головними  елементами  сюжету,  теми  чи  місця  дії. Багато  історій  цього жанру  відбуваються  у  вигаданих  світах,   де  магія  є   звичною  справою."
            },
            {
                name: "Бойовик",
                description: "Бойовик поєднує в собі драматичний жанр фільму разом з нестримними діями: бійки, автомобільні переслідування, вибухи, стрілянина тощо. Жанр, в основному, показує самостійні намагання героя відновити справедливість, що нерідко переростає у маленьку війну."
            },
            {
                name: "Детектив",
                description: "У детективі розкривається певна таємниця, пов'язана зі злочином"
            },
            {
                name: "Пригоди",
                description: "У жанрі пригоди показується кмітливість та винахідливість героя, уміння перехитрити злодія"
            },
            {
                name:"Комедія",
                description: "У комедійних фільмах засобами гумору та сатири викриваються негативні суспільні та побутові явища, розкривається смішне в навколишній дійсності людини чи живої істоти."
            },
            {
                name: "Драма",
                description: "У драматичних фільмах існує гострий конфлікт, який розвивається в постійній напрузі."
            },
            {
                name: "Трилер",
                description: "У фільмах з жанром трилер специфічні засоби повинні викликати у глядачів або читачів почуття співпереживання, пов'язане з емоціями тривожного очікування, невизначеності, хвилювання чи страху."
            },
            {
                name: "Хорор",
                description: "Фільми з жанром хорор розкриває сюжети та теми, які призначені чи мають потенціал, щоб налякати або досягти переляку своїх читачів, викликаючи почуття жаху і терору."
            },
            {
                name: "Історичний",
                description: "Історичні фільми спеціалізовані на зображенні значущих для окремого народу чи людства подій минулого."
            },
            {
                name: "Документальний",
                description: "У документальних фільмах сюжетна лінія побудована винятково на реальних подіях"
            }
        ]
    })
}

// async function createManyFilms(){
//     const films = await prisma.film.createMany({
//         data: [
//             {
//                 name: 'Red One',
//                 rating: 87,
//                 year: 2024,
//                 baseLanguage: "English",
//                 homeCountry: "USA",
//                 ageRestriction: "PG-13"
//             },
//             {
//                 name: 'Conclave',
//                 rating: 75,
//                 year: 2024,
//                 baseLanguage: "English",
//                 homeCountry: "USA",
//                 ageRestriction: "PG-13"
//             },
//             {
//                 name: 'The Best Christmas Pageant Ever',
//                 rating: 95,
//                 year: 2024,
//                 baseLanguage: "English",
//                 homeCountry: "USA",
//                 ageRestriction: "G"
//             },
//         ]
//     })
// }

async function createOneGenresOnFilms(film_id:number, genre_id:number){
    const genreOnFilm = await prisma.genresOnFilms.create({
        data: {
            filmId: film_id,
            genreId: genre_id
        }
    })
}

async function updateFilms(){
    const film = await prisma.film.update({
        where: {
            id: 4
        },
        data: {
            description: "Nobody is ready for the mayhem and surprises that ensue when six of the worst youngsters disrupt the town's yearly Christmas performance."
        }
    })
}


interface IJsonResponse{
    "categories":{
        "genres": String[]
    },
    "src": String,
    "name": String,
    "description": String,
    "rating": Number
}

async function getAllFilms(){
    const films = await prisma.film.findMany()
    const genres = await prisma.genre.findMany()
    const genresOnFilms = await prisma.genresOnFilms.findMany()
    
    let jsonResponse: IJsonResponse[] = []
    
    
    films.forEach((film) => {
        let genresOfFilmIds = genresOnFilms
        let genresOfFilmsNames = genres

        genresOfFilmIds = genresOfFilmIds.filter((pair) => {
            return film.id == pair.filmId;
        })

        let genresNames = <string[]>[]

        genresOfFilmIds.forEach((pair) => {
            genresOfFilmsNames.forEach((genre) => {
                if (genre.id == pair.genreId){
                    genresNames.push(genre.name)
                }
            }) 
        })

        
        jsonResponse.push({
            "categories":{
                "genres": genresNames
            },
            "src": film.src,
            "name": film.name,
            "description": film.description,
            "rating": film.rating
        })
        
    })
    console.log(jsonResponse)

    return jsonResponse
}

async function getAllGenres(){
    try{
        const genres = await prisma.genre.findMany()
        console.log(genres)
        return genres

    } catch (error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code == 'P2002'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2015'){
                console.log(error.message)
                throw error
            } else if (error.code == 'P2019'){
                console.log(error.message)
                throw error
            } 
        }
    }
    
}





getAllGenres().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})