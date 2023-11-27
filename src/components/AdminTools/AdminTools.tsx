import { observer } from "mobx-react-lite"
import { useStores } from "hooks/rootStoreContext"
import { useEffect, useState, useCallback } from "react"
import { ITodo, IAdmin, AdminToolsPopupId, IUser, INotification } from "models"
import { isAdmin } from "utils/typeGuards"
import { adminToolsIcons } from "utils/menuIcons"
import IconButton from '@mui/material/IconButton'
import Badge from "@mui/material/Badge"
import NotificationsList from "../NotifcationsList/NotificationsList"
import RemainsTasksList from "../RemainsTasksList/RemainsTasksList"
import RemainsDevelopersList from "../RemainsDevelopersList/RemainsDevelopersList"
import CloseIcon from '@mui/icons-material/Close';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import "./style.css"

interface AdminToolsProps {
    showTasks: () => void;
}

const AdminTools = ({ showTasks }: AdminToolsProps) => {

    const [popupId, setPopupId] = useState<AdminToolsPopupId>(AdminToolsPopupId.EMPTY_ID)
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [remainsTasks, setRemainsTasks] = useState<ITodo[]>([])
    const [remainsDevelopers, setRemainsDevelopers] = useState<IUser[]>([])
    const [notificationsCount, setNotificationsCount] = useState<number>(0)
    const [tasksCount, setTasksCount] = useState<number>(0)
    const [devsCount, setDevsCount] = useState<number>(0)
    const [adminTasksCount, setAdminTasksCount] = useState<number>(0)

    let iconFlag = false;

    const handleShowPopup = useCallback((id: AdminToolsPopupId) => {
        setPopupId(id)
        if (id === AdminToolsPopupId.ADMIN_TASKS) {
            showTasks()
            iconFlag = !iconFlag
            adminToolsIcons[3].icon = iconFlag ? <CloseIcon/> : <NotListedLocationIcon />
        }
    }, [])

    const {
        commandsStore: { getCommandsAction, getRemainsTasks }, 
        usersStore: { getUsersAction, getRemainsUsers },
        adminsStore: { clearNotifications, admin: a, getLogAdmin },
    } = useStores()

    useEffect(() => {
        if (isAdmin(a)) {
            getCommandsAction()
            getUsersAction()
            getLogAdmin().then()
            getRemainsTasks(a.todos).then((res) => {
                setRemainsTasks(res)
                setTasksCount(res.length)
            })
            getRemainsUsers().then((res) => {
                setRemainsDevelopers(res)
                setDevsCount(res.length)
            })
            setNotifications(a.notifications)
            setNotificationsCount(a.notifications.length)
            setAdminTasksCount(a.todos.length)
        }
    }, [])

    const tmpCount = [
        notificationsCount,
        tasksCount,
        devsCount,
        adminTasksCount,
    ] // количество badgeContent в tools

    adminToolsIcons.map((item, index) => { return item.count = tmpCount[index] })

    const handleClearNotifications = async () => {
        let tmp: IAdmin = JSON.parse(JSON.stringify(a))
        tmp.notifications = []
        setNotifications([])
        setNotificationsCount(0)
        await clearNotifications(tmp)
        handleShowPopup(AdminToolsPopupId.EMPTY_ID)
    }

    return (
        <>
            <div className = "admin__tools-wrapper">
                <div className = "admin__tools-wrapper__container">
                    {adminToolsIcons.map((item, index) => {
                        return (
                            <div 
                                className = "admin__tools-wrapper__container-icon__wrapper"
                                title = {item.title}
                                key = {index}
                            >
                                <IconButton 
                                    size="large" 
                                    aria-label="show 4 new mails" 
                                    color="inherit"
                                >
                                    <>
                                        <Badge
                                            badgeContent = {item.count} 
                                            color = "error"
                                            onClick = {() => handleShowPopup(item.id)}
                                            id = {item.id}
                                        >
                                            {item.icon}
                                        </Badge>
                                    </>
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                popupId === AdminToolsPopupId.NOTIFICATIONS ?
                    <NotificationsList
                        handleShowPopup = {handleShowPopup}
                        notifications = {notifications}
                        handleClearNotifications = {handleClearNotifications}
                    /> : null
            }
            {
                popupId === AdminToolsPopupId.REMAINS_TODOS ?
                    <RemainsTasksList
                        handleShowPopup = {handleShowPopup}
                        remainsTasks = {remainsTasks}
                    /> : null
            }
            {
                popupId === AdminToolsPopupId.REMAINS_DEVELOPERS ?
                    <RemainsDevelopersList
                        handleShowPopup = {handleShowPopup}
                        remainsDevelopers = {remainsDevelopers}
                    /> : null
            }
        </>
    )
}

export default observer(AdminTools)