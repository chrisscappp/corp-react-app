import { useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "hooks/rootStoreContext"
import { IUser } from "models"
import { isUser } from "utils/typeGuards"
import { LOG_USER } from "utils/localStorageKeys"
import { logOut } from "utils/logOut"
import { useNavigate } from "react-router-dom"
import { unGotTodosTitle } from "utils/declination"
import Spinner from "components/Spinner/Spinner"
import Typography from "@mui/material/Typography"
import ChangePassword from "components/ChangePassword/ChangePassword"
import DeleteAccount from "components/DeleteAccount/DeleteAccount"
import AlertComponent from "components/AlertComponent/AlertComponent"
import ProfileInfoWrapper from "components/ProfileInfoWrapper/ProfileInfoWrapper"
import Footer from "components/Footer/Footer"
import VerifedUser from "components/VerifedUser/VerifedUser"
import VerifedPopup from "components/VerifedPopup/VerifedPopup"
import "./style.css"

interface UserProfileLayoutProps {
    u: IUser | object;
}

const UserProfileLayout = ({ u }: UserProfileLayoutProps) => {

    const [user, setUser] = useState(u)
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)
    const [showChangePopup, setShowChangePopup] = useState<boolean>(false)
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
    const [showVerifedPopup, setShowVerifedPopup] = useState<boolean>(false)

    const handldeShowChange = useCallback(() => setShowChangePopup((showPopup) => !showPopup), [])
    const handldeShowDelete = useCallback(() => setShowDeletePopup((showPopup) => !showPopup), [])
    const handleShowVerifed = useCallback(() => setShowVerifedPopup((showPopup) => !showPopup), [])

    const navigate = useNavigate()

    const { usersStore: {
        changePassword, 
        deleteAccount,
        verifedAccount
    } } = useStores()

    const handleChangePassword = useCallback((val: string) => {
        let tmp: IUser = JSON.parse(JSON.stringify(user))
        tmp.password = val
        setUser(tmp)
        changePassword(tmp, val)
        setShowSuccessAlert(true)
        setTimeout(() => setShowSuccessAlert(false), 5000)
    }, [])

    const handleDeleteAccount = () => {
        let tmp: IUser = JSON.parse(JSON.stringify(user))
        deleteAccount(tmp.id)
        logOut(LOG_USER)
    }

    const handleVerifedUser = (val: string) => {
        let tmp: IUser = JSON.parse(JSON.stringify(user))
        tmp.teamId = val
        verifedAccount(tmp, val)
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
                        handleShowChangePopup = {handldeShowChange}
                        handleShowDeletePopup = {handldeShowDelete}
                    />
                    {
                        user.teamId ? null :
                        <>
                            <VerifedUser
                                handleShowVerifed = {handleShowVerifed}
                            />
                        </>
                    }
                    <div className = "userProfile__wrapper-tasks__wrapper common-profile__wrapper" style = {{marginBottom: "50px"}}>
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
                                                У вас {user.todos.length} {unGotTodosTitle(user.todos.length, ['невыполненная', 'невыполненные', 'невыполненных'])} {unGotTodosTitle(user.todos.length, ['задача', 'задачи', 'задач'])}!
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
                        handleShowPopup = {handldeShowChange}
                        setShowErrorAlert = {setShowErrorAlert}
                    /> 
                    : null
            }
            {
                showDeletePopup ?
                    <DeleteAccount
                        userPass = {user.password}
                        handleDeleteAccount = {handleDeleteAccount}
                        handleShowPopup = {handldeShowDelete}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
            {
                showVerifedPopup ?
                    <VerifedPopup
                        handleVerifedUser = {handleVerifedUser}
                        handleShowVerifed = {handleShowVerifed}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
        </>
    )
}

export default observer(UserProfileLayout)