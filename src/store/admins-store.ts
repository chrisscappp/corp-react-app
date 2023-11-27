import { makeAutoObservable, runInAction  } from "mobx"
import { getData } from "api/get"
import { sendData } from "api/post"
import { putData } from "api/put"
import { deleteData } from "api/delete"
import { ENV, ADMINS, COMMANDS } from "api/urls"
import { IAdmin, INotification, ITodo, ITeam } from "models"
import { isTodo } from "utils/typeGuards"
import { findByKey } from "utils/findByKey"
import { TOKEN_KEY } from "utils/localStorageKeys"
import axios from "axios"
import AxiosError from "axios-error"

class AdminsStore {
    admins: IAdmin[] = []
    admin: IAdmin | object = {};
    takenTodos: ITodo[] = []
    notifications: INotification[] = []
    grabTodo: ITodo | object = {};
    isLoading = false
    error = ""
    private urlAPI = `${ENV}/${ADMINS}`

    constructor() {
        makeAutoObservable(this)
    }

    setGrabTodo = (value: ITodo) => {
        this.grabTodo = value
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

    getTakenTodosAction = async (adminId: string) => {
        await this.getAdminsAction()
        const adm = findByKey(this.admins, "id", adminId)
        if (adm) {
            this.takenTodos = adm?.todos
            return this.takenTodos
        } else {
            return []
        }
    }

    getLogAdmin = async () => {
        await this.getAdminsAction()
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            const find = findByKey(this.admins, "token", token)
            this.admin = find ? find : {}
        }
    }

    getAdminNotifications = async (adminId: string) => {
        await this.getAdminsAction()
        const adm = findByKey(this.admins, "id", adminId)
        if (adm) {
            this.notifications = adm?.notifications
            return this.notifications
        } else {
            return []
        }
    }

    removeTakenTodo = async (adminId: string, task: ITodo) => {
        await this.getTakenTodosAction(adminId)
        this.takenTodos = this.takenTodos.filter(t => t.id !== task.id)
        const url = this.urlAPI + `/${adminId}`
        await axios.patch(url, { todos: this.takenTodos })
    }

    pickTodo = async (data: IAdmin, t: ITodo) => {
        this.admins = this.admins.map((a: IAdmin) => a.id === data.id ? {...a, todos: [...a.todos, t]} : a)
        const url = this.urlAPI + `/${data.id}`
        await axios.patch(url, { todos: data.todos })
    }

    clearNotifications = async (data: IAdmin) => {
        const url = this.urlAPI + `/${data.id}`
        await putData(url, data)
    }

    addAdmin = (a: IAdmin) => {
        this.admins.push(a)
        sendData(this.urlAPI, a)
        const teamUrl = `${ENV}/${COMMANDS}`
        const obj: ITeam = {
            id: a.login,
            name: "Без названия",
            todos: [],
            gotTodos: []
        }
        sendData(teamUrl, obj)
    }

    changePassword = async (data: IAdmin, changeValue: string) => {
        this.admins = this.admins.map((a: IAdmin) => a.id === data.id ? {...a, password: changeValue} : a)
        const url = this.urlAPI + `/${data.id}`
        await axios.patch(url, { password: changeValue })
    }

    deleteAccount = (id: string) => {
        this.admins = this.admins.filter((a: IAdmin) => a.id !== id)
        deleteData(this.urlAPI, id)
    }
}

export default AdminsStore