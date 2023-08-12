import { findByKey } from './findByKey';
import { generateToken } from './generateToken';
import { Rangs, RegFormValues, IAdmin, IUser } from "../models"
import { LOG_ADMIN, LOG_USER } from './localStorageKeys';

export function regNewUser(data: RegFormValues, rng: Rangs, arr: IUser[], add: (a: IUser) => void) {
    const t = generateToken()
    const user: IUser = {
        id: arr.length + 1,
        login: data.login, 
        password: data.password, 
        token: t,
        name: data.name, 
        is: "developer", 
        todos: [], 
        rang: rng,
        rating: 0,
        completeTodos: [],
        overdueTodos: [],
    }
    const fn = findByKey(arr, "login", data.login)
    if (fn) {
        alert("Логин занят")
    } else {
        add(user)
        localStorage.setItem(LOG_USER, JSON.stringify(user))
        window.location.reload()
    }
}

export function regNewAdmin(data: RegFormValues, rng: Rangs, arr: IAdmin[], add: (a: IAdmin) => void) {
    const t = generateToken()
    const admin: IAdmin = {
        id: arr.length + 1,
        login: data.login, 
        password: data.password, 
        token: t,
        name: data.name, 
        is: "lead", 
        todos: [], 
        rang: "Team Lead",
    }
    const fn = findByKey(arr, "login", data.login)
    if (fn) {
        alert("Логин занят")
    } else {
        add(admin)
        localStorage.setItem(LOG_ADMIN, JSON.stringify(admin))
        window.location.reload()
    }

}