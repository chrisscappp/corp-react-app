import { makeAutoObservable } from "mobx"
import { IPromiseBasedObservable, fromPromise } from "mobx-utils"
import { getData } from "../api/get"
import { ENV, TODOS } from "../api/urls"
import { ITodo } from "../models"

class TodosStore {
    todos!: IPromiseBasedObservable<ITodo[]>
    private urlAPI = `${ENV}/${TODOS}`

    constructor() {
        makeAutoObservable(this)
    }

    getTodosAction = () => {
        this.todos = fromPromise(getData<ITodo[]>(this.urlAPI))
    }
}

export default TodosStore