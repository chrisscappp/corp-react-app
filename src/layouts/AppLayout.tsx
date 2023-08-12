import { Routes, Route } from "react-router-dom"
import HomeLayout from "./HomeLayout"
import DevelopersLayout from "./MyTasksLayout"
import InfoLayout from "./InfoLayout"
import UserProfileLyout from "./UserProfileLayout"
import AdminProfileLayout from "./AdminProfileLayout"
import TodosLayout from "./TodosLayout"
import MyTasksLayout from "./MyTasksLayout"
import ErrorLayout from "./ErrorLayout"
import ProfileMenu from "../components/ProfileMenu/ProfileMenu"
import Error from "../components/Error/Error"
import AdminTools from "../components/AdminTools/AdminTools"
import { useLogUser } from "../hooks/logUser"
import { useLogAdmin } from "../hooks/logAdmin"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { isUser, isAdmin } from "../utils/typeGuards"
import { useNavigate } from 'react-router-dom'
import { useStores } from "../hooks/rootStoreContext"
import { adminIcons, userIcons } from "../utils/menuIcons"
import { LOG_ADMIN, LOG_USER } from "../utils/localStorageKeys"

const AppLayout = () => {

    const navigate = useNavigate()

    const { 
        usersStore: { 
            error: usersError,
        },
        adminsStore: { 
            error: adminsError,
        },
        todosStore: {
            error: todosError,
        },
    } = useStores()

    const { user, error: userError } = useLogUser()
    const { admin, error: adminError } = useLogAdmin() 

    useEffect(() => {
        if (isUser(user) || isAdmin(admin)) {
            navigate("/profile")
        } else {
            navigate('/')
        }
    }, [user, admin])

    if (usersError) return <Error message = {usersError}/>
    if (adminsError) return <Error message = {adminsError}/>
    if (todosError) return <Error message = {todosError}/>

    return (
        <>
            {   userError === "" ? 
                <ProfileMenu
                    icons = {userIcons}
                    logOutKey = {LOG_USER}
                /> : null
            }
            {   adminError === "" ? 
                <>
                    <ProfileMenu
                        icons = {adminIcons}
                        logOutKey = {LOG_ADMIN}
                    /> 
                     
                </>
                : null
            }
            <Routes>
                {
                    userError === "" ?
                        <>
                            <Route path = "/mytodos" element = { 
                                <MyTasksLayout/> 
                            }/>
                            <Route path = "/todos" element = { 
                                <TodosLayout
                                    whoLog = {"developer"}
                                /> 
                            }/>
                            <Route path = "/profile" element = { 
                                <UserProfileLyout
                                    u = {user}
                                /> 
                            }
                            />
                            <Route path = "/info" element = { 
                                <InfoLayout/> 
                            }/>
                        </>
                        :
                        <Route path = "/" element = { <HomeLayout/> }/>
                }
                {
                    adminError === "" ?
                        <>
                            <Route path = "/developers" element = { 
                                <>
                                    <AdminTools
                                        a = {admin}
                                    /> 
                                    <DevelopersLayout/> 
                                </>
                            }
                            />
                            <Route path = "/todos" element = { 
                                <>
                                    <AdminTools
                                        a = {admin}
                                    /> 
                                    <TodosLayout
                                        whoLog = {"lead"}
                                    /> 
                                </>
                            }
                            />
                            <Route path = "/profile" element = { 
                                <>
                                    <AdminTools
                                        a = {admin}
                                    /> 
                                    <AdminProfileLayout
                                        a = {admin}
                                    /> 
                                </>
                                
                            }
                            />
                            <Route path = "/info" element = { <InfoLayout/> }/>
                        </>
                        :  
                        <Route path = "/" element = { <HomeLayout/> }/>
                }
                <Route path = "*" element = { <ErrorLayout/> }/>
            </Routes>
        </>
    )
}

export default observer(AppLayout)