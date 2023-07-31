import { makeAutoObservable } from "mobx"
import { IPromiseBasedObservable, fromPromise } from "mobx-utils"
import { getData } from "../api/get"
import { ENV, USERS } from "../api/urls"
import { IUser } from "../models"

class UsersStore {
    users!: IPromiseBasedObservable<IUser[]>
    token!: string | undefined
    private urlAPI = `${ENV}/${USERS}`

    pedik!: IUser | object

    constructor() {
        makeAutoObservable(this)
    }

    getUsersAction = () => {
        this.users = fromPromise(getData<IUser[]>(this.urlAPI))
    }

    logUser = () => {
        this.getUsersAction()
        //setTimeout(() => console.log(this.users?.value), 200)
        // тварь ебаная попробовать переделать
        //console.log("USERS", this.users.value)
    }
}

export default UsersStore