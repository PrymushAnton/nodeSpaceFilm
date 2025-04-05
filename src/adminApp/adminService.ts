import { IError, ISuccess } from "../types/types"
import adminRepository from "./adminRepository"


async function getAllModels(): Promise<ISuccess<string[]> | IError> {
    const models = await adminRepository.getAllModels()
    if (!models) return { status: "error", message: "No models found" }
    if (typeof(models) === "string") return {status: "error", message: "Error while working with prisma"}

    return {status: "success", data: models}
}

const adminService = {
    getAllModels: getAllModels,
}

export default adminService