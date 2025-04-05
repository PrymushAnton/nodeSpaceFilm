import { Prisma } from "@prisma/client";

export type ActorPayload = Prisma.ActorGetPayload<{}>

export type ActorPayloadWithFilms = Prisma.ActorGetPayload<{}> & { films: Prisma.FilmGetPayload<{}>[] }

export type ActorNamesPayload = Prisma.ActorGetPayload<{
	select: {
		id: true,
		name: true
	}
}>

export type ActorCreatePayload = Prisma.ActorGetPayload<{
	omit: {
		id: true;
	};
}> & {
	films: number[];
};


export type ActorUpdatePayload = Prisma.ActorGetPayload<{}> & {
	films: number[];
};


export type ActorDeletePayload = Prisma.ActorGetPayload<{
    select: {
        id: true
    }
}>