import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { AdminToolsPopupId } from "models"

export const adminIcons = [
    {
        title: "Профиль",
        icon: <AccountBoxIcon/>,
        path: "/profile",
    },
    {
        title: "Задачи",
        icon: <FormatListBulletedIcon />,
        path: "/todos",
    },
    {
        title: "Сотрудники",
        icon: <GroupsIcon />,
        path: "/developers",
    },
    {
        title: "Поддержка",
        icon: <SupportAgentIcon />,
        path: "/info",
    },
]

export const userIcons = [
    {
        title: "Профиль",
        icon: <AccountBoxIcon/>,
        path: "/profile",
    },
    {
        title: "Мои задачи",
        icon: <ChecklistIcon />,
        path: "/mytodos",
    },
    {
        title: "Все задачи",
        icon: <FormatListBulletedIcon />,
        path: "/todos",
    },
    {
        title: "Поддержка",
        icon: <SupportAgentIcon />,
        path: "/info",
    },
]

export const unVerifedUserIcons = [
    {
        title: "Профиль",
        icon: <AccountBoxIcon/>,
        path: "/profile",
    },
    {
        title: "Поддержка",
        icon: <SupportAgentIcon />,
        path: "/info",
    },
]

export const adminToolsIcons = [
    {
        title: "Уведомления",
        icon: <NotificationsIcon />,
        id: AdminToolsPopupId.NOTIFICATIONS,
        count: 0,
    },
    {
        title: "Неразобранные задачи",
        icon: <FormatListBulletedIcon />,
        id: AdminToolsPopupId.REMAINS_TODOS,
        count: 0,
    },
    {
        title: "Сотрудники без дела",
        icon: <GroupIcon />,
        id: AdminToolsPopupId.REMAINS_DEVELOPERS,
        count: 0,
    },
    {
        title: "Распределить задачи",
        icon: <NotListedLocationIcon />,
        id: AdminToolsPopupId.ADMIN_TASKS,
        count: 0,
    },
]