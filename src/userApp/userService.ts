import userRepository from "./userRepository";
import {
	UserCreateInput,
	UserCreatePayload,
	UserData,
	UserDeletePayload,
	UserNamesPayload,
	UserUpdatePayload,
} from "./types";
import { ISuccess, IError } from "../types/types";
import { UserPayload } from "./types";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";

async function getAllUsers(): Promise<ISuccess<UserPayload[]> | IError> {
	const users = await userRepository.getAllUsers();

	if (!users) return { status: "error", message: "There are no users" };
	if (typeof users === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: users };
}

async function getAllNameUsers(): Promise<
	ISuccess<UserNamesPayload[]> | IError
> {
	const users = await userRepository.getAllNameUsers();
	if (!users)
		return { status: "error", message: "Error while getting users names" };
	if (typeof users === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: users };
}

async function getUserByIdFull(id: number): Promise<ISuccess<any> | IError> {
	const user = await userRepository.getUserByIdFull(id);

	if (!user)
		return {
			status: "error",
			message: "Error while getting full user by id",
		};
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	const userObj = {
		...Object.fromEntries(
			Object.entries(user).map(([key, value]) => [
				key,
				{
					type: typeof value === "string" ? "text" : typeof value,
					data: value,
				},
			])
		),
	};

	return { status: "success", data: userObj };
}

async function createOneUser(
	data: UserCreatePayload
): Promise<ISuccess<string> | IError> {

    const hashedPassword = await hash(data.password, 10);
    
	const user = await userRepository.createOneUser({...data, password: hashedPassword});

	if (!user) return { status: "error", message: "Error while creating user" };
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: "User was created successfully" };
}

async function updateOneUser(
	data: UserUpdatePayload
): Promise<ISuccess<string> | IError> {
	const user = await userRepository.updateOneUser(data);

	if (!user) return { status: "error", message: "Error while updating user" };
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: "User was updated successfully" };
}

async function deleteOneUser(
	data: UserDeletePayload
): Promise<ISuccess<string> | IError> {
	const user = await userRepository.deleteOneUser(data);

	if (!user) return { status: "error", message: "Error while deleting user" };
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: "User was deleted successfully" };
}

async function getUserFields(): Promise<ISuccess<any> | IError> {
	const fields = await userRepository.getUserFields();

	if (!fields)
		return { status: "error", message: "Error while getting user fields" };
	if (typeof fields === "string")
		return { status: "error", message: "Error while working with prisma" };

	interface LooseObject {
		[key: string]: any;
	}
	const object: LooseObject = {};
	console.log(fields);

	fields?.forEach((field) => {
		if (field.name === "id") return;
		if (field.name === "film") return;
		if (field.name === "user") return;

		object[field.name] = {
			type:
				field.name === "userId" || field.name === "filmId"
					? "manytoone"
					: field.type === "Int"
					? "number"
					: field.type === "String"
					? "text"
					: field.type.toLowerCase(),
			data:
				field.type === "userId" || field.type === "filmId"
					? 0
					: field.type === "Int"
					? 0
					: "",
		};
	});

	return { status: "success", data: object };
}

async function authUser(
	email: string,
	password: string
): Promise<ISuccess<string> | IError> {
	let user = await userRepository.findUserByEmail(email);

	if (!user)
		return {
			status: "error",
			message: "Error while getting full user by id",
		};
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	const isPasswordTheSame = await compare(password, user.password);

	if (!isPasswordTheSame)
		return { status: "error", message: "Error: wrong password" };

	const token = sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });

	return { status: "success", data: token };
}

async function registerUser(
	data: UserCreateInput
): Promise<ISuccess<string> | IError> {
	const user = await userRepository.findUserByEmail(data.email);

	if (user) return { status: "error", message: "User already exists" };
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	const hashedPassword = await hash(data.password, 10);

	const userData = {
		...data,
		password: hashedPassword,
	};
	const newUser = await userRepository.createUser(userData);

	if (!newUser)
		return { status: "error", message: "Error while creating user" };
	if (typeof newUser === "string")
		return { status: "error", message: "Error while working with prisma" };

	const token = sign({ id: newUser.id }, SECRET_KEY, { expiresIn: "1d" });

	return { status: "success", data: token };
}

async function getUserById(id: number): Promise<ISuccess<UserData> | IError> {
	const user = await userRepository.getUserById(id);

	if (!user) return { status: "error", message: "User is not found" };
	if (typeof user === "string")
		return { status: "error", message: "Error while working with prisma" };

	return { status: "success", data: user };
}

const usersService = {
	getAllUsers: getAllUsers,
	getAllNameUsers: getAllNameUsers,
	getUserByIdFull: getUserByIdFull,
	createOneUser: createOneUser,
	deleteOneUser: deleteOneUser,
	updateOneUser: updateOneUser,
	getUserFields: getUserFields,
	authUser: authUser,
	registerUser: registerUser,
	getUserById: getUserById,
};

export default usersService;
