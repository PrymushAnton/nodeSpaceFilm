import { Prisma } from "@prisma/client";


export type ReviewPayload = Prisma.ReviewGetPayload<{}>;

export type ReviewGetPayload = Prisma.ReviewGetPayload<{
    omit: {
        id: true;
    };
}> & {
    filmId: number;
};

export type ReviewCreatePayload = Prisma.ReviewGetPayload<{
    omit: {
        id: true;
    };
}> & {
    filmId: number;
};


export type ReviewUpdatePayload = Prisma.ReviewGetPayload<{}> & {
    filmId: number;
};


export type ReviewDeletePayload = Prisma.ReviewGetPayload<{
    select: {
        id: true
    }
}>