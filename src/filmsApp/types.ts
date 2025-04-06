import { Prisma } from "@prisma/client";


export type FilmPayload = Prisma.FilmGetPayload<{}>;



type ReviewPayload = Prisma.ReviewGetPayload<{
    select: {
        text: true,
        mark: true,
        user: {
            select: {
                src: true,
                name: true
            }
        }
    }
}>
interface IActor{
    id: number
    name: string
}

export type FilmPayloadWithActorsGenresReviews = Prisma.FilmGetPayload<{}> & {actors: IActor[], genres: string[], reviews: ReviewPayload[]}


export type FilmNamesPayload = Prisma.FilmGetPayload<{
	select: {
		id: true,
		name: true
	}
}>


// export type FilmPayloadWithActorsGenresReviewsDirectorsIds = Prisma.FilmGetPayload<{
//     include: {
//         genres: {
//             select:{
//                 genreId: true
//             }
//         },
//         actors: {
//             select: {
//                 actorId: true
//             }
//         },
//         directors: {
//             select: {
//                 directorId: true
//             }
//         }
//     },
//     omit: {
//         id: true
//     }
// }>


export type FilmCreatePayload = Prisma.FilmGetPayload<{
    omit: {
        id: true;
    };
}> & {
    genres: number[];
    actors: number[];
    directors: number[];
};


export type FilmUpdatePayload = Prisma.FilmGetPayload<{}> & {
    genres: number[];
    actors: number[];
    directors: number[];
};


export type FilmDeletePayload = Prisma.FilmGetPayload<{
    select: {
        id: true
    }
}>