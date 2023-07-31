import { Routes, Route } from "react-router-dom"
import HomeLayout from "./HomeLayout"
import DevelopersLayout from "./DevelopersLayout"
import InfoLayout from "./InfoLayout"
import UserProfileLyout from "./UserProfileLyout"
import AdminProfileLayout from "./AdminProfileLayout"
import TodosLayout from "./TodosLayout"
import ErrorLayout from "./ErrorLayout"
import { useLogUser } from "../hooks/logUser"
import { useLogAdmin } from "../hooks/logAdmin"
import { useEffect } from "react"
import { isUser, isAdmin } from "../utils/typeGuards"
import { useNavigate } from 'react-router-dom'
import { useStores } from "../hooks/rootStoreContext"

const AppLayout = () => {

    const { usersStore: { logUser, pedik, getUsersAction, users } } = useStores()

    const { user, error: userError } = useLogUser()
    const { admin, error: adminError } = useLogAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        getUsersAction()
        logUser()
    }, [users])

    useEffect(() => {
        if (isUser(user) || isAdmin(admin)) {
            navigate("/profile")
        } else {
            navigate('/')
        }
    }, [user])

    // переиспользуемый модал с оповещениями - две кнопки с наполнителями и цветом
    // через пропсы. ф-ии закрытия внутри. кнопка сохранить изменения ???

    // отображать различные лайауты. профили разные. разные вкладки тудус. 
    //у юсера убрать тудус заменить олтудус и поставить мои дела

    return (
        <>
            <Routes>
                {
                    userError === "" ?
                        <>
                            <Route path = "/developers" element = { <DevelopersLayout/> }/>
                            <Route path = "/todos" element = { <TodosLayout/> }/>
                            <Route path = "/profile" element = { 
                                <UserProfileLyout
                                    user = {user}
                                /> 
                            }
                            />
                            <Route path = "/info" element = { <InfoLayout/> }/>
                        </>
                        :
                        <Route path = "/" element = { <HomeLayout/> }/>
                }
                {
                    adminError === ""
                ?
                    <>
                        <Route path = "/developers" element = { <DevelopersLayout/> }/>
                        <Route path = "/todos" element = { <TodosLayout/> }/>
                        <Route path = "/profile" element = { 
                                <AdminProfileLayout
                                    admin = {admin}
                                /> 
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

export default AppLayout