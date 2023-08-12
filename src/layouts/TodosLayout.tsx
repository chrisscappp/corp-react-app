import { observer } from "mobx-react-lite"
import { useStores } from "../hooks/rootStoreContext"
import { useEffect, useState } from "react"
import { ITodo, IAdmin, WhoLogType } from "../models"
import { isAdmin } from "../utils/typeGuards"
import Spinner from "../components/Spinner/Spinner"
import AlertComponent from "../components/AlertComponent/AlertComponent"
import CreateNewTask from "../components/CreateNewTask/CreateNewTask"
import TodoList from "../components/TodoList/TodoList"
import Footer from "../components/Footer/Footer"

interface TodosLayoutProps {
    whoLog: WhoLogType;
}

const TodosLayout = ({ whoLog }: TodosLayoutProps) => {

    const { 
        todosStore: {
            getTodosAction, isLoading, todos,
        },
    } = useStores()

    const [showNewTaskPopup, setShowNewTaskPopup] = useState<boolean>(false)
    const [showTaskAlert, setShowTaskAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

    useEffect(() => {
        getTodosAction()
    }, [])

    if (isLoading) return <Spinner/>

    return (
        <>
            <AlertComponent
                successTitle = {"Поздравляю! Вы тиран"}
                showSuccess = {showTaskAlert}
                showError = {showErrorAlert}
            />
            <div className = "userProfile__wrapper">
                <div className = "userProfile__wrapper-container">
                    <TodoList
                        todos = {todos}
                        whoLog = {whoLog}
                        showPopup = {setShowNewTaskPopup}
                    />
                </div>
            </div>
            <Footer/>
            {
                showNewTaskPopup ? 
                    <CreateNewTask
                        setShowPopup = {setShowNewTaskPopup}
                        setShowTaskAlert = {setShowTaskAlert}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
        </>
    )
}

export default observer(TodosLayout)