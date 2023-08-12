import { useState, memo } from 'react'
import Box from '@mui/material/Box';
import NavigateMenu from '../NavigateMenu/NavigateMenu'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {
    burgerMenuStyle,
    appBarStyle,
} from "./style"
import { logOut } from '../../utils/logOut'
import './style.css'

interface ProfileMenuProps {
    icons: any;
    logOutKey: string;
}

const ProfileMenu = ({ icons, logOutKey }: ProfileMenuProps) => {

    const [drawerMenu, setDrawerMenu] = useState({
        left: false,
    })
    
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

    const handleLogOut = () => logOut(logOutKey)            

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
            </Box>
        </>
    )
}

export default memo(ProfileMenu)
