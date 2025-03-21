import { Prisma } from "@prisma/client";


export type FilmPayload = Prisma.FilmGetPayload<{}>;

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