import { AdminToolsPopupId, ITodo } from "models"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"

interface RemainsTasksListProps {
    handleShowPopup: (id: AdminToolsPopupId) => void;
    remainsTasks: ITodo[];
}

const RemainsTasksList = ({ handleShowPopup, remainsTasks }: RemainsTasksListProps) => {
    
    const navigate = useNavigate()

    const goToTasks = () => {
        navigate("/todos")
        handleShowPopup(AdminToolsPopupId.EMPTY_ID)
    }
    
    return (
        <>
            <Popup close = {() => handleShowPopup(AdminToolsPopupId.EMPTY_ID)}>
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Неразобранные задачи
                    </Typography>
                    <span className = "close__span">
                        <CloseIcon 
                            onClick = {() => handleShowPopup(AdminToolsPopupId.EMPTY_ID)}
                            fontSize='medium'
                        />
                    </span>
                </div>
                <div className = "notifications-wrapper">
                    <div className = "notifications-wrapper__container">
                        {
                            remainsTasks.length > 0 ? 
                            <>
                                {
                                remainsTasks.slice(0, 5).map((task) => {
                                return (
                                    <div key = {task.id}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {task.title} - {task.recommendedRang} - {task.score} очка
                                        </Typography>
                                    </div>                                     
                                )
                                }) 
                            }
                            <button className = "clear__notif__button" onClick = {goToTasks}>
                                посмотреть больше
                            </button>
                            </>
                            : <Typography gutterBottom variant="h6" component="div">Все задачи разобраны</Typography>
                        }
                    </div>
                    
                </div>
            </Popup>
        </>
    )
}

export default memo(RemainsTasksList)