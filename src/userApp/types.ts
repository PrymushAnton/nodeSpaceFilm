import { Prisma } from "@prisma/client";


export type UserPayload = Prisma.UserGetPayload<{}>;


export type UserNamesPayload = Prisma.UserGetPayload<{
    select:{
        name: true,
        id: true
    }
}>;

export type UserData = Prisma.UserGetPayload<{
    select: {
        name: true,
        email: true,
        role: true,
        src: true
    }
}>

export type UserCreateInput = Prisma.UserCreateInput

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