import { memo, useState } from "react"
import { ITodo, WhoLogType } from "models"
import { useStores } from "hooks/rootStoreContext";
import Typography from "@mui/material/Typography"
import AlertComponent from "components/AlertComponent/AlertComponent";
import "./style.css"

interface TodoItemProps {
    todo: ITodo;
    whoLog?: WhoLogType | undefined;
    handlePickTodo?: ((t: ITodo) => void) | undefined;
}

const TodoItem = ({ todo, whoLog, handlePickTodo }: TodoItemProps) => {

    const { 
        commandsStore: {
            deleteTodo, gotTodo
        },
        usersStore: {
            completeTodo, remakeTodo
        } 
    } = useStores()

    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState<string>("")

    const handleCompleteTodo = (t: ITodo) => {
        gotTodo(t)
        completeTodo(t)
        deleteTodo(t.id)
        setShowSuccessMessage("Задача была успешно выполнена!")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
    }

    const handleRemakeTodo = (t: ITodo) => {
        remakeTodo(t)
        deleteTodo(t.id)
        setShowSuccessMessage("Задача отправлена на доработку...")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
    }

    return (
        <>
            <AlertComponent
                showError={showError}
                showSuccess={showSuccess}
                successTitle={showSuccessMessage}
            />
            <div className = "todoItem__wrapper-container">
                <div className = "todoItem__wrapper-container__left">
                    <div className = "todoItem__wrapper-container-header">
                        <Typography gutterBottom variant="h6" component="div" style = {{padding: "8px 0px 0px 15px"}}>
                            {todo.title}
                        </Typography>
                    </div>
                    <div className = "todoItem__wrapper-container-body">
                        <Typography color="#212121" style = {{padding: "0px 0px 0px 15px"}}>
                            {todo.body}
                        </Typography>
                        <Typography color="#212121" style = {{padding: "7px 0px 0px 15px"}}>
                            Рекомендуемый ранг: {todo.recommendedRang}
                        </Typography>
                        <Typography color="#212121" style = {{padding: "7px 0px 15px 15px"}}>
                            Количество очков за выполнение: {todo.score}
                        </Typography>
                    </div>
                </div>
                {
                    whoLog === "lead" && todo.verified === false ?
                        <>
                            <div className = "todoItem__wrapper-container__right">
                                <button 
                                    className = "todoItem__wrapper-container__right-button"
                                    onClick = {handlePickTodo ? () => handlePickTodo(todo) : () => console.log('bob')}
                                    title = "Добавить задачу в облако"
                                >
                                    +
                                </button>
                            </div>
                        </> : null
                
                }
                {
                    todo.verified === true && whoLog === "lead" ?
                    <>
                            <div className = "btns-panel">
                                <div style = {{marginLeft: "50px"}}>
                                    <button 
                                        className = "btn_panel btn-good"
                                        onClick = {() => handleCompleteTodo(todo)}
                                    >
                                        принять
                                    </button>
                                    <button 
                                        className = "btn_panel btn-no"
                                        style = {{marginTop: "10px"}}
                                        onClick = {() => handleRemakeTodo(todo)}
                                    >
                                        на переделку
                                    </button>
                                </div>
                            </div>
                        </> : null
                }
                                 
                 
            </div>
        </>
    )
}

export default memo(TodoItem)