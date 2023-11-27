import { observer } from "mobx-react-lite"
import { useStores } from "hooks/rootStoreContext"
import { useEffect, useState, useCallback } from "react"
import { ITodo, IAdmin, WhoLogType } from "models"
import { isAdmin } from "utils/typeGuards"
import { findByKey } from "utils/findByKey"
import { useCurrentItems } from "hooks/paginationDevelopers"
import { TASKS_SORT_KEYS } from "utils/sortKeys"
import { sortTasksByKey } from "utils/sortByKey"
import { tasksSortArr } from "utils/sortView"
import { taskSortProp } from "utils/sortView"
import { TODOS_IN_PAGE } from "utils/constants"
import Spinner from "components/Spinner/Spinner"
import AlertComponent from "components/AlertComponent/AlertComponent"
import SortSelector from "components/SortSelector/SortSelector"
import CreateNewTask from "components/CreateNewTask/CreateNewTask"
import TodoList from "components/TodoList/TodoList"
import Error from "components/Error/Error"

interface TodosLayoutProps {
    a: IAdmin | object;
    whoLog: WhoLogType;
}

const TodosLayout = ({ a, whoLog }: TodosLayoutProps) => {

    const { 
        commandsStore: { 
            getCommandsAction, 
            isLoading, 
            error,
            teamTodos, 
            deleteTodo,
            createNewTodo 
        },
        adminsStore: { 
            getTakenTodosAction, 
            pickTodo, 
        },
    } = useStores()

    const [itemOffset, setItemOffset] = useState(0)
    const { currentItems } = useCurrentItems(teamTodos, itemOffset, TODOS_IN_PAGE)
    const pageCount = Math.ceil(teamTodos.length / TODOS_IN_PAGE)

    const handleChangePage = (e: any, page: number) => {
        const newOffset = ((page - 1) * TODOS_IN_PAGE) % teamTodos.length
        setItemOffset(newOffset)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [filteredTasks, setFilteredTasks] = useState(currentItems)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [showTaskAlert, setShowTaskAlert] = useState<boolean>(false)
    const [showPickAlert, setShowPickAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

    useEffect(() => {
        getCommandsAction()
        getTakenTodosAction(isAdmin(a) ? a.id : "0").then()
    }, [])

    const handleShowPopup = () => setShowPopup((showPopup) => !showPopup)

    const handlePickTodo = useCallback(async (t: ITodo) => {
        if (isAdmin(a)) {
            const fnd = findByKey(a.todos, "id", t.id)
            if (!fnd) {
                a.todos.push(t)
                pickTodo(a, t)
                deleteTodo(t.id)
                if (filteredTasks.length <= 6) {
                    let tmp = [...currentItems].filter(td => td.id !== t.id)
                    setFilteredTasks(tmp)
                } 
                setShowPickAlert(true)
                setTimeout(() => setShowPickAlert(false), 3000)
            } else {
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 3000)
            }
        }   
    }, [])

    const handleCreateTodo = async (todo: ITodo) => {
        await createNewTodo(todo)
        if (filteredTasks.length < 6) {
            setFilteredTasks([...currentItems, todo])
            setShowTaskAlert(true)
            setTimeout(() => setShowTaskAlert(false), 3000)
        } else {
            setFilteredTasks(currentItems)
            setShowTaskAlert(true)
            setTimeout(() => setShowTaskAlert(false), 3000)
        }
    }

    const sortTasks = (key: string) => {
        let t = JSON.parse(JSON.stringify(teamTodos))
        let tmp = sortTasksByKey(key as TASKS_SORT_KEYS, t)
        setFilteredTasks(tmp)
    }

    useEffect(() => {
        setFilteredTasks(currentItems)
    }, [itemOffset, teamTodos])

    // баг со стороны юсера с сортировкой списка дел
    // баг пофикшен. не работало из-за useCallback - подробнее про него

    if (isLoading) return <Spinner/>
    if (error) return <Error message = {error}/>

    return (
        <>
            <AlertComponent
                successTitle = {"Поздравляю! Вы тиран"}
                showSuccess = {showTaskAlert}
                showError = {showErrorAlert}
            />
            <AlertComponent
                successTitle = {"Задача добавлена в облако"}
                showSuccess = {showPickAlert}
                showError = {showErrorAlert}
            />
            <div className = "todos__wrapper">
                <div className = "todos__wrapper-container" style = {{marginTop: "10px"}}>
                    {
                    teamTodos.length === 0 ?
                    null 
                    : <SortSelector
                        sortProp = {taskSortProp}
                        viewItems = {tasksSortArr}
                        sortTasks = {sortTasks}
                    />   
                    }
                    <TodoList
                        todos = {filteredTasks}
                        whoLog = {whoLog}
                        pageCount = {pageCount}
                        handleChangePage = {handleChangePage}
                        handlePickTodo = {handlePickTodo}
                        handleShowPopup = {handleShowPopup}
                    />
                </div>
            </div>
            {
                showPopup ? 
                    <CreateNewTask
                        handleShowPopup = {handleShowPopup}
                        setShowTaskAlert = {setShowTaskAlert}
                        setShowErrorAlert = {setShowErrorAlert}
                        handleTest = {handleCreateTodo}
                    />
                    : null
            }
        </>
    )
}

export default observer(TodosLayout)