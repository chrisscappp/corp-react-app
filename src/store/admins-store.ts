import { makeAutoObservable, runInAction  } from "mobx"
import { getData } from "../api/get"
import { sendData } from "../api/post"
import { putData } from "../api/put"
import { deleteData } from "../api/delete"
import { ENV, ADMINS } from "../api/urls"
import { IAdmin, ITodo } from "../models"
import { findByKey } from "../utils/findByKey"
import AxiosError from "axios-error"

class AdminsStore {
    admins: IAdmin[] = []
    takenTodos: ITodo[] = []
    isLoading = false
    error = ""
    private urlAPI = `${ENV}/${ADMINS}`

    constructor() {
        makeAutoObservable(this)
    }

    getAdminsAction = async () => {
        try {
            this.isLoading = true
            const res = await getData<IAdmin[]>(this.urlAPI)
            runInAction(() => {
                this.admins = res
                this.isLoading = false
                this.error = ""
            })
        } catch (e: unknown) {
            const err = e as AxiosError
            this.error = err.message
            this.isLoading = false
        }
    }

    getTakenTodosAction = async (adminId: number) => {
        await this.getAdminsAction()
        try {
            this.isLoading = true
            const res = await getData<IAdmin[]>(this.urlAPI)
            runInAction(() => {
                this.admins = res
                this.isLoading = false
                this.error = ""
            })
            const adm = findByKey(this.admins, "id", adminId)
            if (adm) {
                this.takenTodos = adm?.todos
            } else {
                this.takenTodos = []
            }
            
        } catch (e: unknown) {
            const err = e as AxiosError
            this.error = err.message
            this.isLoading = false
        }
    }

    pickTodo = (t: ITodo, adminId: number) => {
        this.takenTodos.push(t)
        const url = this.urlAPI + `/${adminId}`
        //putData(url, t)
    }

    addAdmin = (a: IAdmin) => {
        this.admins.push(a)
        sendData(this.urlAPI, a)
    }

    changePassword = (data: IAdmin, changeValue: string) => {
        this.admins = this.admins.map((a: IAdmin) => a.id === data.id ? {...a, password: changeValue} : a)
        const url = this.urlAPI + `/${data.id}`
        putData(url, data)
    }

    deleteAccount = (id: number) => {
        this.admins = this.admins.filter((a: IAdmin) => a.id !== id)
        deleteData(this.urlAPI, id)
    }
}

export default AdminsStore