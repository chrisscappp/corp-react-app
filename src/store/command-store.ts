import { makeAutoObservable, runInAction } from "mobx"
import { getData } from "api/get"
import { ENV, COMMANDS } from "api/urls"
import { ITodo, ITeam, CompleteTodo } from "models"
import AxiosError from "axios-error"
import axios from "axios"

class CommandStore {
    teamTodos: ITodo[] = []
    gotTodos: CompleteTodo[] = []
    teamName: string = ""
    teamId: string = ""
    isLoading = false
    error = ""
    private urlAPI = `${ENV}/${COMMANDS}`

    constructor() {
        makeAutoObservable(this)
    }

    setCommandId = (id: string) => {
        this.teamId = id
    }

    getCommandsAction = async () => {
        try {
            this.isLoading = true
            const url = this.urlAPI + `/${this.teamId}`
            const res = await getData<ITeam>(url)
            runInAction(() => {
                this.teamTodos = res.todos
                this.gotTodos = res.gotTodos
                this.teamName = res.name
                this.teamId = res.id
                this.isLoading = false
                this.error = ""
            })
        } catch (e: unknown) {
            const err = e as AxiosError
            this.error = err.message
            this.isLoading = false
        }
    }

    getRemainsTasks = async (assembledTasks: ITodo[]) => {
        await this.getCommandsAction()
        let arr = []
        for (let i = 0; i < this.teamTodos.length; i++) {
            const fnd = assembledTasks.find(task => task.id === this.teamTodos[i].id)
            if (!fnd) {
                arr.push(this.teamTodos[i])
            }
        }
        return arr
    }

    createNewTodo = async (data: ITodo) => {
        await this.getCommandsAction()
        this.teamTodos.unshift(data)
        const url = this.urlAPI + `/${this.teamId}`
        await axios.patch(url, { todos: this.teamTodos })
    }

    deleteTodo = async (id: string) => {
        const url = this.urlAPI + `/${this.teamId}`
        this.teamTodos = this.teamTodos.filter((t: ITodo) => t.id !== id)
        await axios.patch(url, { todos: this.teamTodos })
    }

    gotTodo = async (data: ITodo) => {
        const url = this.urlAPI + `/${this.teamId}`
        data.complete = true
        this.gotTodos.push(data)
        await axios.patch(url, { gotTodos: this.gotTodos })
    }
}

export default CommandStore