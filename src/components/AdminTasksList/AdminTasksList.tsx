import { observer } from "mobx-react-lite"
import { useStores } from "hooks/rootStoreContext"
import { useEffect, useState } from "react"
import { isAdmin } from "utils/typeGuards"
import '@fontsource/roboto/300.css';
import "./style.css"
import { Typography } from "@mui/material";
import { ITodo } from "models";
import Pagination from "@mui/material/Pagination"
import { useCurrentItems } from "hooks/paginationDevelopers";
import { CLOUD_TASKS_IN_PAGE } from "utils/constants";

const AdminTasksList = () => {

    const { 
        adminsStore: {
            admin, takenTodos, getTakenTodosAction, setGrabTodo: adminGrab
        },
        usersStore: {
            users, setGrabTodo
        }
    } = useStores()

    const [itemOffset, setItemOffset] = useState(0)
    const { currentItems } = useCurrentItems(takenTodos, itemOffset, CLOUD_TASKS_IN_PAGE)
    const pageCount = Math.ceil(takenTodos.length / CLOUD_TASKS_IN_PAGE)

    const handleChangePage = (e: any, page: number) => {
        const newOffset = ((page - 1) * CLOUD_TASKS_IN_PAGE) % takenTodos.length
        setItemOffset(newOffset)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [tmpTodos, setTmpTodos] = useState(currentItems)

    useEffect(() => {
        getTakenTodosAction(isAdmin(admin) ? admin.id : "0")
    }, [])

    const dragOverHandler = (e: any) => {
        e.preventDefault()
    }

    const dragStartHandler = (e: any, todo: ITodo) => {
        setGrabTodo(todo)  
        localStorage.setItem("TEST", JSON.stringify(todo))
        adminGrab(todo)
    }

    const dragLeaveHandler = (e: any) => {
        e.preventDefault()
    } // когда положили

    useEffect(() => {
        setTmpTodos(currentItems)
    }, [itemOffset, takenTodos])

    //console.log("HUIII", tmpTodos)

    return (
        <>
            <div className = "tasks-wrapper">
                <div className = "tasks-wrapper__container">
                    {
                        tmpTodos?.map((todo) => {
                            return (
                                <div 
                                    key = {todo.id} className = "tasks-wrapper__container-item-wrapper"
                                    draggable = {true}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDragStart={(e) => dragStartHandler(e, todo)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                >
                                    <div 
                                        className = "tasks-wrapper__container-item-wrapper__container"
                                        style = {{ borderBottom: "1px solid rgb(188, 188, 188)" }}
                                    >
                                        <Typography className = "tasks-wrapper__container-item__text">
                                            {todo.title}. Для {todo.recommendedRang}. Очки: {todo.score}
                                        </Typography>
                                    </div>
                                </div>    
                            )
                        })
                    }
                    <div className = "tasks-wrapper__container-pagination__wrapper">
                        <Pagination
                            count={pageCount} 
                            onChange = {handleChangePage}
                            size = {"medium"}
                            className = "tasks-wrapper__container-pagination__item"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(AdminTasksList)