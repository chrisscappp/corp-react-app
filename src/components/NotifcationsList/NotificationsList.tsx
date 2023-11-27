import { memo } from "react"
import { AdminToolsPopupId, INotification } from "models"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import NotificationItem from "../NotificationItem/NotificationItem"
import "./style.css"

interface NotificationsListIProps {
    handleShowPopup: (id: AdminToolsPopupId) => void;
    notifications: INotification[];
    handleClearNotifications: () => void;
}

const NotificationsList = ({ handleShowPopup, notifications, handleClearNotifications }: NotificationsListIProps) => {

    // реализовать логику очистки уведов по дате

    return (
        <>
            <Popup close = {() => handleShowPopup(AdminToolsPopupId.EMPTY_ID)}>
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Уведомления
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
                            notifications.length > 0 ? 
                                <>
                                    {
                                        notifications.map((notification) => {
                                            return (
                                                <NotificationItem
                                                    key = {notification.id} 
                                                    notification = {notification}
                                                />
                                            )
                                        })
                                    }
                                    <button className = "clear__notif__button" onClick = {handleClearNotifications}>
                                        очистить уведомления
                                    </button>
                                </>
                                : <Typography gutterBottom variant="h6" component="div">Уведомлений пока нет</Typography>
                        }
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default memo(NotificationsList)