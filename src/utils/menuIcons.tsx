import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LogoutIcon from '@mui/icons-material/Logout';

export const adminIcons = [
    {
        title: "Профиль",
        icon: <AccountBoxIcon/>,
        path: "/profile",
    },
    {
        title: "Сотрудники",
        icon: <GroupsIcon />,
        path: "/developers",
    },
    {
        title: "Задачи",
        icon: <FormatListBulletedIcon />,
        path: "/todos",
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
        title: "Все задачи",
        icon: <FormatListBulletedIcon />,
        path: "/todos",
    },
    {
        title: "Мои задачи",
        icon: <ChecklistIcon />,
        path: "/mytodos",
    },
    {
        title: "Поддержка",
        icon: <SupportAgentIcon />,
        path: "/info",
    },
]