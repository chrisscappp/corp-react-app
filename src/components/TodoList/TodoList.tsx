import { observer } from "mobx-react-lite"
import { ITodo, WhoLogType } from "models"
import Typography from "@mui/material/Typography"
import TodoItem from "../TodoItem/TodoItem"
import Pagination from "@mui/material/Pagination"
import "./style.css"

interface TodoListProps {
    todos: ITodo[];
    whoLog: WhoLogType;
    pageCount: number;
    handleChangePage: ((e: any, page: number) => (void));
    handlePickTodo: (t: ITodo) => void;
    handleShowPopup: () => void;
}

const TodoList = ({ todos, whoLog, pageCount, handleChangePage, handlePickTodo, handleShowPopup }: TodoListProps) => {
    
    return (
        <> 
            <div className = "todoList__wrapper">
                <div className = "todolist-wrapper__header">
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
                <div className = "info-wrapper__body todolist-wrapper">
                    {
                        todos.length > 0 ?
                            <>
                                {todos.map((todo: ITodo) => {
                                    return (
                                        <div 
                                            key = {todo.id} 
                                            className = "todoItem__wrapper"
                                            style = {todo.verified ? {backgroundColor: "#c5e8e8"} : {}}
                                        >
                                            <TodoItem
                                                todo = {todo}
                                                whoLog = {whoLog}
                                                handlePickTodo = {handlePickTodo}
                                            />
                                        </div>
                                    )
                                })}
                                <Pagination 
                                    count={pageCount} 
                                    onChange = {handleChangePage}
                                    size = {"medium"}
                                    className = "footer__pagination"
                                />
                            </> 
                            : <Typography gutterBottom variant="h6" component="div">
                                Список задач пуст
                            </Typography>
                    } 
                </div>
            </div>
            {

            }
        </>
    )
}

export default observer(TodoList)