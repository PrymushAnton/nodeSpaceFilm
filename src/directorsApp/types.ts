import { Prisma } from "@prisma/client";


export type DirectorPayload = Prisma.DirectorGetPayload<{}>;

export type DirectorGetPayload = Prisma.DirectorGetPayload<{
    omit: {
        id: true;
    };
}> & {
    films: number[];
};

export type DirectorCreatePayload = Prisma.DirectorGetPayload<{
    omit: {
        id: true;
    };
}> & {
    films: number[];
};


export type DirectorUpdatePayload = Prisma.DirectorGetPayload<{}> & {
    films: number[];
};


export type DirectorDeletePayload = Prisma.DirectorGetPayload<{
    select: {
        id: true
    }
}>