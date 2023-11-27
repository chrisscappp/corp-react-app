import { IUser } from "models"
import Typography from "@mui/material/Typography"
import "./style.css"
import { useStores } from "hooks/rootStoreContext"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"

interface DeveloperItemProps {
    developer: IUser;
}

const DeveloperItem = ({ developer }: DeveloperItemProps) => {

    const navigate = useNavigate()

    const { 
        usersStore: { pushTodoToUser },
        adminsStore: { takenTodos, admin, removeTakenTodo }
    } = useStores()

    return (
        <>
            <div 
                className = "developerItem__wrapper-container"
            >
                <div className = "todoItem__wrapper-container-header">
                    <Typography gutterBottom variant="h5" component="div" style = {{padding: "10px 0px 0px 15px"}}>
                        {developer.name} - {developer.rang} {developer.is}
                    </Typography>
                </div>
                <div className = "todoItem__wrapper-container-body">
                    <Typography color="text.secondary" style = {{padding: "0px 0px 0px 15px"}}>
                        @{developer.login} 
                    </Typography>
                    <Typography color="#212121" style = {{padding: "4px 0px 0px 15px"}}>
                        Взятых задач на текущий момент: {developer.todos.length}
                    </Typography>
                    <Typography color="#212121" style = {{padding: "7px 0px 0px 15px"}}>
                        Рейтинг: {developer.rating}
                    </Typography>
                    <Typography color="#212121" style = {{padding: "4px 0px 0px 15px"}}>
                        Выполненных задач: {developer.completeTodos.length}
                    </Typography>
                    <Typography color="#212121" style = {{padding: "4px 0px 15px 15px"}}>
                        Просроченных задач: {developer.overdueTodos.length}
                    </Typography>
                    <button 
                        className = "view__task__button" 
                        onClick = {() => navigate(`${developer.id}`)}
                    >
                        закреплённые задачи
                    </button>
                </div>
            </div>
        </>
    )
}

export default observer(DeveloperItem)