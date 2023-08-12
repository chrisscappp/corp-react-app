import { makeAutoObservable, runInAction } from "mobx"
import { getData } from "../api/get"
import { sendData } from "../api/post"
import { putData } from "../api/put"
import { deleteData } from "../api/delete"
import { ENV, USERS } from "../api/urls"
import { IUser } from "../models"
import AxiosError from "axios-error"

class UsersStore {
    users: IUser[] = []
    isLoading = false
    error = ""
    private urlAPI = `${ENV}/${USERS}`

    constructor() {
        makeAutoObservable(this)
    }

    getUsersAction = async () => {
        try {
            this.isLoading = true
            const res = await getData<IUser[]>(this.urlAPI)
            runInAction(() => {
                this.users = res
                this.isLoading = false
                this.error = ""
            })
        } catch (e: unknown) {
            const err = e as AxiosError
            this.error = err.message
            this.isLoading = false
        }
    }

    // функция которая возвращает работников без дела

    addUser = (a: IUser) => {
        this.users.push(a)
        sendData(this.urlAPI, a)
    }

    sortByRating = async () => {
        await this.getUsersAction()
        const tmp: IUser[] =  JSON.parse(JSON.stringify(this.users))
        return tmp
        //return tmp.sort((prev, next) => next.rating - prev.rating)
    }

    topFiveUsers = async () => {
        await this.getUsersAction()
        const tmp: IUser[] = JSON.parse(JSON.stringify(this.users))
        tmp.sort((prev, next) => next.rating - prev.rating)
        return tmp.slice(0, 5)
    }

    foolDeveloper = async () => {
        await this.getUsersAction()
        let tmp = this.users.reduce((p, v) => {
            return ( (p.rating < v.rating) || (p.completeTodos.length < v.completeTodos.length) ? p : v )
        }) // ПЕРВАЯ версия алгоритма
        //let tmp = {}
        return tmp
        console.log(tmp)
        this.users.forEach((user, index) => {
            let rating = user.rating
            let completeTodos = user.completeTodos.length
            let overdueTodos = user.overdueTodos.length


            //console.log(rating, completeTodos, overdueTodos)
        })
        
        // рейтинг - очки выполненных туду минус очки просроченных
        // алгоритм: смотреть очки, количесто тудушек, просроченные тудушки 
    }

    changePassword = (data: IUser, changeValue: string) => {
        this.users = this.users.map((u: IUser) => u.id === data.id ? {...u, password: changeValue} : u)
        const url = this.urlAPI + `/${data.id}`
        putData(url, data)
    }

    deleteAccount = (id: number) => {
        this.users = this.users.filter((u: IUser) => u.id !== id)
        deleteData(this.urlAPI, id)
    }

    logUser = () => {
        this.getUsersAction()
        //setTimeout(() => console.log(this.users?.value), 200)
        // попробовать переделать
        //console.log("USERS", this.users.value)
    }
}

export default UsersStore