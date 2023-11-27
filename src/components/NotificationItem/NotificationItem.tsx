import { INotification } from "models"
import Typography from "@mui/material/Typography"

interface NotificationItemProps {
    notification: INotification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {

    //const dt = notification.date.slice(0, 24)
    // такой формат отправлять на сервер

    return (
        <>
            <div className = "notification__wrapper" style = {{marginTop: "15px"}}>
                <Typography gutterBottom variant="h6" component="div">
                    {notification.title} {notification.date}
                </Typography>
            </div>
        </>
    )
}

export default NotificationItem