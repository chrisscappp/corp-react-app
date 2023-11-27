import { makeAutoObservable, runInAction } from "mobx"
import { getData } from "api/get"
import { sendData } from "api/post"
import { putData } from "api/put"
import { deleteData } from "api/delete"
import { ENV, USERS } from "api/urls"
import { CompleteTodo, IAdmin, ITodo, IUser, OverdueTodo } from "models"
import AxiosError from "axios-error"
import { TOKEN_KEY } from "utils/localStorageKeys"
import { findByKey } from "utils/findByKey"
import axios from "axios"
import { isUser } from "utils/typeGuards"
import { generateId } from "utils/generateId"

class UsersStore {
    users: IUser[] = []
    user: IUser | object = {}
    isLoading = false
    grabTodo!: ITodo
    error = ""
    private urlAPI = `${ENV}/${USERS}`

    constructor() {
        makeAutoObservable(this)
    }

    setGrabTodo = (value: ITodo) => {
        this.grabTodo = value
    }

    pushTodoToUser = async (u: IUser, todo: ITodo) => {
        await this.getUsersAction()
        let userCopy: IUser = JSON.parse(JSON.stringify(u))
        let todoCopy: ITodo = JSON.parse(JSON.stringify(todo))
        todoCopy.userId = u.id
        this.users = this.users.map((us: IUser) => us.id === u.id ? {...us, todos: [...userCopy.todos, todoCopy]} : us)
        userCopy.todos.push(todoCopy)
        const url = this.urlAPI + `/${u.id}`
        await axios.patch(url, { todos: userCopy.todos }) 
        return this.users
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

    getLogUser = async () => {
        await this.getUsersAction()
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            const find = findByKey(this.users, "token", token)
            this.user = find ? find : {}
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

    getRemainsUsers = async () => {
        await this.getUsersAction()
        const arr = this.users.filter(user => user.todos.length === 0)  
        return arr
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

    verifedAccount = (data: IUser, changeValue: string) => {
        this.users = this.users.map((u: IUser) => u.id === data.id ? {...u, teamId: changeValue} : u)
        const url = this.urlAPI + `/${data.id}`
        putData(url, data)
    }

    deleteAccount = (id: string) => {
        this.users = this.users.filter((u: IUser) => u.id !== id)
        deleteData(this.urlAPI, id)
    }

    addNotification = async (todo: ITodo, admin: IAdmin, body: string) => {
        await this.getLogUser()
        if (isUser(this.user)) {
            const ntitle = `${this.user.name} ${body} ${todo.title}`
            const notif = {
                id: generateId(),
                title: ntitle,
                date: new Date(),
                viewed: false
            }
            const url = `http://localhost:3000/admins/${admin.id}`
            admin.notifications.push(notif)
            await axios.patch(url, { notifications: admin.notifications })
        }
        
    }

    updateStartTodo = async (todo: ITodo) => {
        await this.getLogUser()
        if (isUser(this.user)) {
            this.user.todos = this.user.todos.map((t: ITodo) => t.id === todo.id ? {...t, start: true} : t)
            const url = this.urlAPI + `/${this.user.id}`
            await axios.patch(url, { todos: this.user.todos })
        }
    }

    updateOverdueTodo = async (todo: ITodo) => {
        await this.getLogUser()
        if (isUser(this.user)) {
            this.user.todos = this.user.todos.filter(t => t.id !== todo.id)
            let overdueTodo: OverdueTodo = {
                id: todo.id,
                score: todo.score,
                title: todo.title
            }
            this.user.overdueTodos.push(overdueTodo)
            this.user.rating -= todo.score
            todo.start = false
            const url = this.urlAPI + `/${this.user.id}`
            await putData(url, this.user)
        }
    }

    updateVerifiedTodo = async (todo: ITodo) => {
        await this.getLogUser()
        if (isUser(this.user)) {
            this.user.todos = this.user.todos.filter(t => t.id !== todo.id)
            todo.verified = true
            const url = this.urlAPI + `/${this.user.id}`
            await putData(url, this.user)
        }
    }

    completeTodo = async (todo: ITodo) => {
        await this.getUsersAction()
        const fndUser = findByKey(this.users, "id", todo.userId)
        if (fndUser) {
            const obj: CompleteTodo = {
                id: todo.id,
                score: todo.score,
                title: todo.title
            }   
            fndUser.completeTodos.push(obj)
            const url = this.urlAPI + `/${fndUser.id}` 
            await putData(url, fndUser)
        }
    }

    remakeTodo = async (todo: ITodo) => {
        await this.getUsersAction()
        const fndUser = findByKey(this.users, "id", todo.userId)
        if (fndUser) {
            todo.verified = false
            fndUser.todos.push(todo)
            const url = this.urlAPI + `/${fndUser.id}` 
            await putData(url, fndUser)
        }
    }
}

export default UsersStore