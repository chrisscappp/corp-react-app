import AxiosError from "axios-error"
import { IUser, IAdmin } from "../models"

export function isAxiosError(err: AxiosError | unknown): err is AxiosError {
    return (err as AxiosError).message !== undefined
}

export function isUser(u: IUser | object): u is IUser {
    return (u as IUser).is === "developer"
}

export function isAdmin(f: IAdmin | object): f is IAdmin {
    return (f as IAdmin).is === "lead"
}