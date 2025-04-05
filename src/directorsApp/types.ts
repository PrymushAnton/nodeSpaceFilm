import { Prisma } from "@prisma/client";

export type DirectorPayload = Prisma.DirectorGetPayload<{}>

export type DirectorPayloadWithFilms = Prisma.DirectorGetPayload<{}> & { films: Prisma.FilmGetPayload<{}>[] }

export type DirectorNamesPayload = Prisma.DirectorGetPayload<{
	select: {
		id: true,
		name: true
	}
}>

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