import { Prisma } from "@prisma/client";


export type UserPayload = Prisma.UserGetPayload<{}>;

export type UserGetPayload = Prisma.UserGetPayload<{
    omit: {
        id: true;
    };
}>

export type UserCreatePayload = Prisma.UserGetPayload<{
    omit: {
        id: true;
    };
}>


export type UserUpdatePayload = Prisma.UserGetPayload<{}>


export type UserDeletePayload = Prisma.UserGetPayload<{
    select: {
        id: true
    }
}>