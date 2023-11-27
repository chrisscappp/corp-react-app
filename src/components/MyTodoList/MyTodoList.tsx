import { observer } from "mobx-react-lite"
import { Typography } from "@mui/material"
import { IAdmin, ITodo, WhoLogType } from "models"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStores } from "hooks/rootStoreContext"
import { findByKey } from "utils/findByKey"
import { TEAM_ID } from "utils/localStorageKeys"
import { isAdmin } from "utils/typeGuards"
import TodoItem from "components/TodoItem/TodoItem"
import WrongModal from "components/WrongModal/WrongModal"
import MyTodoItem from "components/MyTodoItem/MyTodoItem"
import "./style.css"

interface MyTodoListProps {
	flag: boolean;
    todos: ITodo[];
    whoLog: WhoLogType;
}

const MyTodoList = ({ flag, todos, whoLog }: MyTodoListProps) => {

    const navigate = useNavigate()

    const [adm, setAdm] = useState<IAdmin | object>({})
    const [showWrong, setShowWrong] = useState(false)
    const [wrongError, setWrongError] = useState("")

    const { 
    usersStore: {
        updateStartTodo, addNotification, updateOverdueTodo, updateVerifiedTodo
    }, adminsStore: {
        admins
    }, commandsStore: {
        createNewTodo
    }
    } = useStores()

    useEffect(() => {
        const adminLogin = localStorage.getItem(TEAM_ID)
        const fnd: IAdmin | undefined = findByKey(admins, "login", adminLogin ? adminLogin : "")
        if (isAdmin(fnd)) {
            setAdm(fnd)
        }
    }, [])

    const handleVerifiedTodo = async (todo: ITodo) => {
        if (!todo.start) {
            setWrongError("Сначала начните выполнять задачу!")
            setShowWrong(true)
            return
        }
        if (isAdmin(adm)) {
            await updateVerifiedTodo(todo)
            await createNewTodo(todo)
            await addNotification(todo, adm, "отправил задачу на проверку")
            navigate("/mytodos")
        }
    }

    const handleOverdueTodo = async (todo: ITodo) => {
        if (!todo.start) {
            setWrongError("Сначала начните выполнять задачу!")
            setShowWrong(true)
            return
        }
        if (isAdmin(adm)) {
            await updateOverdueTodo(todo)
            await createNewTodo(todo)
            await addNotification(todo, adm, "не справился с задачей")
            navigate("/mytodos")
        }
    }

    const handleStartTodo = async (todo: ITodo) => {
        if (todo.start) {
            setWrongError("Вы уже выполняете эту задачу!")
            setShowWrong(true)
            return
        }
        if (isAdmin(adm)) {
            await updateStartTodo(todo)
            await addNotification(todo, adm, "начал выполнение задачи")
            navigate("/mytodos")
        }
    }

    console.log("HUESOS", whoLog)

	return (
		<>
			<div className = "my__todoList__wrapper">
				<div className = "my__todoList__wrapper__header">
					<Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "25px"}}>
                        Задачи - {todos.length} шт
                    </Typography>
                    {
                        flag ?
                        <>
                            <div>
                                <button 
                                    className = "stepBack__button"
                                    onClick = {() => navigate("/developers")}
                                >
                                    назад
                                </button>
                            </div>
                        </> : null
                    }
				</div>
				<div className = "info-wrapper__body my__todolist-wrapper">
					{
						todos.length > 0 ?
						<>
                                {todos.map((todo: ITodo) => {
                                    return (
                                        <div 
                                            key = {todo.id} 
                                            className = "my__todoItem__wrapper"
                                            style = {todo.start ? { backgroundColor: "#fff2c2" } : {}}
                                        >
                                            {
                                                !whoLog ?
                                                <MyTodoItem
                                                    todo = {todo}
                                                    handleStartTodo = {handleStartTodo}
                                                    handleOverdueTodo = {handleOverdueTodo}
                                                    handleVerifiedTodo = {handleVerifiedTodo}
                                                />
                                                :
                                                <TodoItem
                                                    todo = {todo}
                                                />
                                            }
                                            
                                        </div>
                                    )
                                })}
                            </> 
                            : <Typography gutterBottom variant="h6" component="div">
                                Список задач пуст
                            </Typography>
					}
				</div>
			</div>
            {
                showWrong ?
                <WrongModal
                    setShowPopup={setShowWrong}
                    title = {wrongError}
                />
                : null
            }
		</>
	)
}

export default observer(MyTodoList)