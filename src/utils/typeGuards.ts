import AxiosError from "axios-error"
import { IUser, IAdmin, ITodo } from "models"

type CreateTodoFuncType = (todo: ITodo) => void;

export function isAxiosError(err: AxiosError | unknown): err is AxiosError {
    return (err as AxiosError).message !== undefined
}

export function isUser(u: IUser | object): u is IUser {
    return (u as IUser).is === "developer"
}

export function isAdmin(f: IAdmin | object | undefined): f is IAdmin {
    return (f as IAdmin).is === "lead"
}

export function isCreateTodoFunc(f: CreateTodoFuncType | undefined): f is CreateTodoFuncType {
    return typeof f !== "undefined"
}

export function isTodo(t: ITodo | object): t is ITodo {
    return (t as ITodo).body !== undefined
}