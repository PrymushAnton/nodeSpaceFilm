import { Prisma } from "@prisma/client";


export type GenrePayload = Prisma.GenreGetPayload<{}>;

export type GenreNamesPayload = Prisma.GenreGetPayload<{
    select:{
        id: true,
        name: true
    }
}>;


export type GenreCreatePayload = Prisma.GenreGetPayload<{
    omit: {
        id: true;
    };
}> & {
    films: number[];
};


export type GenreUpdatePayload = Prisma.GenreGetPayload<{}> & {
    films: number[];
};


export type GenreDeletePayload = Prisma.GenreGetPayload<{
    select: {
        id: true
    }
}>