import { memo } from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom'
import { logOut } from "../../utils/logOut"
import LogoutIcon from '@mui/icons-material/Logout';
import './style.css'

interface NavigateMenuProps {
    toggleDrawer: any;
    drawerMenu: any;
    icons: any;
    handleLogOut: () => void;
}

const NavigateMenu = ({toggleDrawer, drawerMenu, icons, handleLogOut}: NavigateMenuProps) => {

    const list = () => (
        <Box
            sx={{ width: "250px" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {icons.map((item: any, index: number) => (
                    <ListItem key={index} disablePadding>
                        <NavLink to = {item.path} style = {{color:'black', width: '250px', textDecoration: "none"}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick = {handleLogOut}>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Выйти"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    )

    return (
        <>
            <Drawer
                open={drawerMenu['left']}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    )
}

export default memo(NavigateMenu)