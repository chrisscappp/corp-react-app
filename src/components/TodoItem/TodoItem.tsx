import { memo } from "react"
import { ITodo } from "../../models"
import Typography from "@mui/material/Typography"
import "./style.css"

interface TodoItemProps {
    todo: ITodo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    return (
        <>
            <div className = "todoItem__wrapper-container">
                <div className = "todoItem__wrapper-container-header">
                    <Typography gutterBottom variant="h6" component="div" style = {{padding: "8px 0px 0px 15px"}}>
                        {todo.title}
                    </Typography>
                </div>
                <div className = "todoItem__wrapper-container-body">
                    <Typography sx={{  }} color="#212121" style = {{padding: "0px 0px 0px 15px"}}>
                        {todo.body}
                    </Typography>
                    <Typography sx={{  }} color="#212121" style = {{padding: "7px 0px 0px 15px"}}>
                        Рекомендуемый ранг: {todo.recommendedRang}
                    </Typography>
                    <Typography sx={{  }} color="#212121" style = {{padding: "7px 0px 15px 15px"}}>
                        Количество очков за выполнение: {todo.score}
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default memo(TodoItem)