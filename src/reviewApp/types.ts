import { Prisma } from "@prisma/client";


export type ReviewPayload = Prisma.ReviewGetPayload<{}>;

export type ReviewNamesPayload = Prisma.ReviewGetPayload<{
	select: {
		id: true,
		name: true
	}
}>

export type ReviewCreatePayload = Prisma.ReviewGetPayload<{
    omit: {
        id: true;
    };
}>


export type ReviewCreatePayloadByUser = Prisma.ReviewGetPayload<{
    omit: {
        id: true;
        userId: true
    };
}> 



export type ReviewUpdatePayload = Prisma.ReviewGetPayload<{}> & {
    filmId: number;
};


export type ReviewDeletePayload = Prisma.ReviewGetPayload<{
    select: {
        id: true
    }
}>