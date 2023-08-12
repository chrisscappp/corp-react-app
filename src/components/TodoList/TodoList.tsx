import { Dispatch, SetStateAction, useState, MouseEvent } from "react"
import { observer } from "mobx-react-lite"
import { ITodo, WhoLogType } from "../../models"
import Typography from "@mui/material/Typography"
import TodoItem from "../TodoItem/TodoItem"
import "./style.css"

interface TodoListProps {
    todos: ITodo[];
    whoLog: WhoLogType;
    showPopup: Dispatch<SetStateAction<boolean>>;
}

// вот тут уже пойдёт драндроп для админа и простой просмотр для юсера
// добавить летающий кружок!!!

const TodoList = ({ todos, whoLog, showPopup }: TodoListProps) => {

    const handleShowPopup = () => showPopup((showPopup) => !showPopup)
    const [currentTodo, setCurrentTodo] = useState<ITodo>()
    const [dropzoneTodos, setDropzoneTodos] = useState<ITodo[]>([])

    const handleDragOver = (event: any) => {
        event.preventDefault()

    }

    const handleDrop = (event: any) => {
        event.preventDefault()
        if (currentTodo) {
            const currentIndex = todos.indexOf(currentTodo)
            setDropzoneTodos([...dropzoneTodos, currentTodo])
            todos.splice(currentIndex, 1)
            console.log(currentIndex)
        }
        
    }

    const handleDrop2 = (event: any) => {
        event.preventDefault()
        if (currentTodo) {
            const currentIndex = dropzoneTodos.indexOf(currentTodo)
            todos.push(currentTodo)
            dropzoneTodos.splice(currentIndex, 1)
            console.log(currentIndex)
        }
    }

    const handleDragStart = (event: any, todo: ITodo) => {
        //console.log(todo)
        setCurrentTodo(todo)
    }

    return (
        <> 
            <div 
                className = "dropzone"
                onDragOver = {handleDragOver}
                onDrop = {handleDrop}
            >
                {dropzoneTodos.map((todo, index) => {
                    return (
                        <div 
                            key = {index + 1}
                            draggable={true}
                            onDragStart = {(event) => handleDragStart(event, todo)}
                        >
                            {todo.body}
                        </div>
                    )
                })}
            </div>
            <div className = "common-profile__wrapper" style = {{marginBottom: "20px"}}>
                <div className = "info-wrapper__header todolist-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Список задач
                    </Typography>
                    {whoLog === "lead" ? 
                        <div>
                            <button 
                                className = "info-wrapper__body-buttons__item item1"
                                style = {{
                                    marginTop: "15px", 
                                    marginRight: "17px", 
                                    width: window.screen.width > 625 ? "330px" : "200px",
                                    height: window.screen.width > 625 ? "30px" : "50px",
                                }}
                                onClick = {handleShowPopup}
                            >
                                взмахнуть жезлом боли и тирании
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div 
                    className = "info-wrapper__body todolist-wrapper"
                    onDragOver = {handleDragOver}
                    onDrop={handleDrop2}
                >
                    {todos.map((todo: ITodo) => {
                        return (
                            <div 
                                key = {todo.id} 
                                className = "todoItem__wrapper"
                                draggable = {true}
                                onDragOver = {handleDragOver}
                                onDragStart = {(event) => handleDragStart(event, todo)}
                            >
                                <TodoItem
                                    todo = {todo}
                                />
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default observer(TodoList)