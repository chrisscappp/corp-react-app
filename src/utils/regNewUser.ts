import { findByKey } from './findByKey';
import { generateToken } from './generateToken';
import { generateId } from './generateId';
import { Rangs, RegFormValues, IAdmin, IUser } from "models"
import { LOG_ADMIN, LOG_USER, TEAM_ID, TOKEN_KEY } from './localStorageKeys';

export function regNewUser(data: RegFormValues, rng: Rangs, arr: IUser[], add: (a: IUser) => void) {
    const t = generateToken()
    const i = generateId()
    const user: IUser = {
        id: i,
        login: data.login, 
        password: data.password, 
        token: t,
        name: data.name, 
        teamId: "",
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
        localStorage.setItem(TOKEN_KEY, user.token)
        window.location.reload()
    }
}

export function regNewAdmin(data: RegFormValues, rng: Rangs, arr: IAdmin[], add: (a: IAdmin) => void) {
    const t = generateToken()
    const i = generateId()
    const admin: IAdmin = {
        id: i,
        login: data.login, 
        password: data.password, 
        token: t,
        name: data.name, 
        is: "lead", 
        todos: [], 
        notifications: [],
        rang: "Team Lead",
    }
    const fn = findByKey(arr, "login", data.login)
    if (fn) {
        alert("Логин занят")
    } else {
        add(admin)
        localStorage.setItem(TOKEN_KEY, admin.token)
        localStorage.setItem(TEAM_ID, admin.login)
        window.location.reload()
    }

}