import { makeAutoObservable, runInAction } from "mobx"
import { getData } from "../api/get"
import { sendData } from "../api/post"
import { ENV, TODOS } from "../api/urls"
import { ITodo, CreateNewTaskValues, Rangs } from "../models"
import AxiosError from "axios-error"

class TodosStore {
    todos: ITodo[] = []
    isLoading = false
    error = ""
    private urlAPI = `${ENV}/${TODOS}`

    constructor() {
        makeAutoObservable(this)
    }

    getTodosAction = async () => {
        try {
            this.isLoading = true
            const res = await getData<ITodo[]>(this.urlAPI)
            runInAction(() => {
                this.todos = res
                this.isLoading = false
                this.error = ""
            })
        } catch (e: unknown) {
            const err = e as AxiosError
            this.error = err.message
            this.isLoading = false
        }
    }

    createNewTodo = async (data: CreateNewTaskValues, rang: Rangs) => {
        await this.getTodosAction()
        const obj: ITodo = {
            id: this.todos.length + 1,
            title: data.title,
            body: data.body,
            complete: false,
            userId: 0,
            recommendedRang: rang,
            score: data.score,
        }
        this.todos.push(obj)
        sendData(this.urlAPI, obj)
    }

    deleteTodo = (id: number) => {
        this.todos = this.todos.filter((t: ITodo) => t.id !== id)
        //deleteData(this.urlAPI, id)
    }
}

export default TodosStore