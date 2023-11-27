import { useState, memo } from 'react'
import { logOut } from 'utils/logOut'
import { TEAM_ID } from 'utils/localStorageKeys'
import Box from '@mui/material/Box'
import NavigateMenu from '../NavigateMenu/NavigateMenu'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import AdminTools from '../AdminTools/AdminTools'
import {
    burgerMenuStyle,
    appBarStyle,
} from "./style"
import './style.css'
import { WhoLogType } from 'models'
import AdminTasksList from "components/AdminTasksList/AdminTasksList"

interface ProfileMenuProps {
    icons: any;
    logOutKey: string;
    whoLogKey: WhoLogType;
}

const ProfileMenu = ({ icons, logOutKey, whoLogKey }: ProfileMenuProps) => {

    const [drawerMenu, setDrawerMenu] = useState({
        left: false,
    })

    const [showAdminTasks, setShowAdminTasks] = useState<boolean>(false)
    const handleShowAdminTasks = () => {
        setShowAdminTasks((showPopup) => !showPopup)
    }
    
    const toggleDrawer =
            (open: any) =>
                (event: any) => {
                    if (
                        event.type === 'keydown' &&
                        ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                    ) {
                        return
                    }
                    setDrawerMenu({ ...drawerMenu, left: open });
                }

    const handleLogOut = () => {
        localStorage.removeItem(TEAM_ID)
        logOut(logOutKey)
    }            

    return (
        <>
            <Box style = {appBarStyle}>
                <NavigateMenu 
                    toggleDrawer = {() => toggleDrawer(false)}
                    drawerMenu = {drawerMenu}
                    icons = {icons}
                    handleLogOut = {handleLogOut}
                />
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 1 }}
                >
                    <Button onClick={toggleDrawer(true)}>
                        <MenuIcon style = {burgerMenuStyle}/>
                    </Button>
                </IconButton>

                {
                    whoLogKey === "lead" ? 
                        <AdminTools
                            showTasks = {handleShowAdminTasks}
                        />
                        : null
                }
            </Box>
            {
                showAdminTasks ?
                <AdminTasksList/>
                : null
            }
        </>
    )
}

export default memo(ProfileMenu)
