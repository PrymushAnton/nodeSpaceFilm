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

export type FilmPayloadWithActorsGenresReviews = Prisma.FilmGetPayload<{}> & {actors: string[], genres: string[], reviews: ReviewPayload[]}


export type FilmGetPayload = Prisma.FilmGetPayload<{
    omit: {
        id: true;
    };
}> & {
    genres: number[];
    actors: number[];
    directors: number[];
};

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