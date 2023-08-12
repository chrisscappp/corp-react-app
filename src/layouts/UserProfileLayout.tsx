import { useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../hooks/rootStoreContext"
import { IUser } from "../models"
import { isUser } from "../utils/typeGuards"
import { LOG_USER } from "../utils/localStorageKeys"
import { logOut } from "../utils/logOut"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner/Spinner"
import Typography from "@mui/material/Typography"
import ChangePassword from "../components/ChangePassword/ChangePassword"
import DeleteAccount from "../components/DeleteAccount/DeleteAccount"
import AlertComponent from "../components/AlertComponent/AlertComponent"
import ProfileInfoWrapper from "../components/ProfileInfoWrapper/ProfileInfoWrapper"
import Footer from "../components/Footer/Footer"

interface UserProfileLayoutProps {
    u: IUser | object;
}

const UserProfileLayout = ({ u }: UserProfileLayoutProps) => {

    const [user, setUser] = useState(u)
    const [showChangePopup, setShowChangePopup] = useState<boolean>(false)
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

    const navigate = useNavigate()

    const { usersStore: {
        changePassword, 
        deleteAccount,
    } } = useStores()

    const handleChangePassword = (val: string) => {
        let tmp: IUser = JSON.parse(JSON.stringify(user))
        tmp.password = val
        setUser(tmp)
        localStorage.removeItem(LOG_USER)
        localStorage.setItem(LOG_USER, JSON.stringify(tmp))
        changePassword(tmp, val)
        setShowSuccessAlert(true)
        setTimeout(() => setShowSuccessAlert(false), 5000)
    }

    const handleDeleteAccount = () => {
        let tmp: IUser = JSON.parse(JSON.stringify(user))
        deleteAccount(tmp.id)
        logOut(LOG_USER)
    }

    if (!isUser(user)) return <Spinner/>

    return (
        <>
            <AlertComponent
                successTitle = {"Пароль успешно изменён!"}
                showSuccess = {showSuccessAlert}
                showError = {showErrorAlert}
            />
            <div className = "userProfile__wrapper">
                <div className = "userProfile__wrapper-container">
                    <ProfileInfoWrapper
                        data = {user}
                        setShowChangePopup = {setShowChangePopup}
                        setShowDeletePopup = {setShowDeletePopup}
                    />
                    <div className = "userProfile__wrapper-tasks__wrapper common-profile__wrapper">
                        <div className = "info-wrapper__header">
                            <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                                Мои задачи
                            </Typography>
                        </div>
                        <div className = "info-wrapper__body">
                            <div style = {{ marginTop: "15px", marginLeft: "15px", paddingBottom: "15px" }}>
                                {
                                    user.todos.length === 0 ?
                                        <>
                                            <Typography gutterBottom variant="h6" component="div" style = {{marginTop: "15px"}}>
                                                Пока кури бамбук
                                            </Typography>
                                        </>
                                        :
                                        <>
                                            <Typography gutterBottom variant="h6" component="div" style = {{marginTop: "15px"}}>
                                                У вас {user.todos.length} невыполненных задач!
                                            </Typography>
                                            <button 
                                                className = "info-wrapper__body-buttons__item item1" 
                                                onClick = {() => navigate("/mytodos")}
                                            >
                                                посмотреть
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            {
                showChangePopup ? 
                    <ChangePassword
                        oldPassword = {user.password}
                        handleChangePassword = {handleChangePassword}
                        setShowPopup = {setShowChangePopup}
                        setShowErrorAlert = {setShowErrorAlert}
                    /> 
                    : null
            }
            {
                showDeletePopup ?
                    <DeleteAccount
                        userPass = {user.password}
                        handleDeleteAccount = {handleDeleteAccount}
                        setShowPopup = {setShowDeletePopup}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
        </>
    )
}

export default observer(UserProfileLayout)