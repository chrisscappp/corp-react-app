import { memo } from "react"
import { AdminToolsPopupId, IUser } from "models"
import { useNavigate } from "react-router-dom"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"

interface RemainsTasksListProps {
    handleShowPopup: (id: AdminToolsPopupId) => void;
    remainsDevelopers: IUser[];
}

const RemainsDevelopersList = ({ handleShowPopup, remainsDevelopers }: RemainsTasksListProps) => {
    
    const navigate = useNavigate()

    const goToDevs = () => {
        navigate("/developers")
        handleShowPopup(AdminToolsPopupId.EMPTY_ID)
    }
    
    return (
        <>
            <Popup close = {() => handleShowPopup(AdminToolsPopupId.EMPTY_ID)}>
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Разработчики без дела
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
                            remainsDevelopers.length > 0 ? remainsDevelopers.slice(0, 5).map((dev) => {
                                return (
                                    <div key = {dev.id}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {dev.name} - {dev.rang}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            
                                        </Typography>
                                    </div>                                     
                                )
                            }) : <Typography gutterBottom variant="h6" component="div">Бездельников нет</Typography>
                        }
                    </div>
                    <button className = "clear__notif__button" onClick = {goToDevs}>
                        посмотреть больше
                    </button>
                </div>
            </Popup>
        </>
    )
}

export default memo(RemainsDevelopersList)