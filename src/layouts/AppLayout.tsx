import { Routes, Route, useNavigate } from "react-router-dom"
import { lazy, useEffect } from "react"
import { useStores } from "hooks/rootStoreContext"
import { observer } from "mobx-react-lite"
import { isUser, isAdmin } from "utils/typeGuards"
import { TEAM_ID, TOKEN_KEY } from "utils/localStorageKeys"
import Error from "components/Error/Error"
import Layout from "./Layout"
import ShowUserTasks from "components/ShowUserTasks/ShowUserTasks"

const HomePage = lazy(() => {return import("./HomeLayout")})
const DevelopersPage = lazy(() => {return import("./DevelopersLayout")})
const UserProfilePage = lazy(() => {return import("./UserProfileLayout")})
const AdminProfilePage = lazy(() => {return import("./AdminProfileLayout")})
const TodosPage = lazy(() => {return import("./TodosLayout")})
const MyTasksPage = lazy(() => {return import("./MyTasksLayout")})
const InfoPage = lazy(() => {return import("./InfoLayout")})
const ErrorPage = lazy(() => {return import("./ErrorLayout")})

const AppLayout = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem(TOKEN_KEY)
    const teamId = localStorage.getItem(TEAM_ID)

    const { 
        usersStore: { error: usersError, user, getLogUser, users, getUsersAction  },
        adminsStore: { error: adminsError, admin, getLogAdmin },
        commandsStore: { error: todosError, setCommandId },
    } = useStores()

    useEffect(() => {
        setCommandId(teamId ? teamId : "")
        getLogUser().then()
        getLogAdmin().then()
        getUsersAction()
    }, [])

    useEffect(() => {
        if (token !== null) {
            navigate("/profile")
        } else {
            navigate("/")
        }
    }, [user, admin])

    if (usersError) return <Error message = {usersError}/>
    if (adminsError) return <Error message = {adminsError}/>
    if (todosError) return <Error message = {todosError}/>

    return (
        <>
            <Routes>
                {
                    isUser(user)  ?
                        <>
                            <Route path = "/" element = {
                                <Layout 
                                    whoLog = {user}
                                />
                            }>
                                <Route path = "profile" element = { 
                                    <UserProfilePage
                                        u = {user}
                                    /> 
                                }/>
                                <Route path = "mytodos" element = { 
                                    <MyTasksPage
                                        u = {user}
                                    />
                                }/>
                                <Route path = "todos" element = { 
                                    <TodosPage
                                        a = {admin}
                                        whoLog = {"developer"}
                                    /> 
                                }/>
                                <Route path = "info" element = { <InfoPage/> }/>
                            </Route> 
                        </>
                        :
                        <Route path = "/" element = { <HomePage/> }/>
                }
                {
                    isAdmin(admin) ?
                        <>
                            <Route path = "/" element = {
                                <Layout 
                                    whoLog = {admin}
                                />
                            }>
                                <Route path = "developers" element = { <DevelopersPage/> }/>
                                <Route path = "todos" element = { 
                                    <TodosPage
                                        a = {admin}
                                        whoLog = {"lead"}
                                    /> 
                                }/>
                                <Route path = "profile" element = { 
                                    <AdminProfilePage
                                        a = {admin}
                                    /> 
                                }/>
                                <Route path = "info" element = { <InfoPage/> }/>
                                <Route path = "developers/:id" element = { 
                                    <ShowUserTasks 
                                        users = {users}
                                        whoLog = {admin.is}
                                    /> 
                                }/>
                            </Route> 
                        </>
                        :  
                        <Route path = "/" element = { <HomePage/> }/>
                }
                <Route path = "*" element = { <ErrorPage/> }/>
            </Routes>
        </>
    )
}

export default observer(AppLayout)