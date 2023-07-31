import { makeAutoObservable } from "mobx"
import { IPromiseBasedObservable, fromPromise } from "mobx-utils"
import { getData } from "../api/get"
import { ENV, ADMINS } from "../api/urls"
import { IAdmin } from "../models"

class AdminsStore {
    admins!: IPromiseBasedObservable<IAdmin[]>
    private urlAPI = `${ENV}/${ADMINS}`

    constructor() {
        makeAutoObservable(this)
    }

    getAdminsAction = () => {
        this.admins = fromPromise(getData<IAdmin[]>(this.urlAPI))
    }
}

export default AdminsStore