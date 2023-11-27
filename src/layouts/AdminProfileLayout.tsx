import { useState, useCallback } from "react"
import { IAdmin } from "models"
import { isAdmin } from "utils/typeGuards"
import { LOG_ADMIN } from "utils/localStorageKeys"
import { logOut } from "utils/logOut"
import { observer } from "mobx-react-lite"
import { useStores } from "hooks/rootStoreContext"
import Spinner from "components/Spinner/Spinner"
import ChangePassword from "components/ChangePassword/ChangePassword"
import DeleteAccount from "components/DeleteAccount/DeleteAccount"
import CreateNewTask from "components/CreateNewTask/CreateNewTask"
import AlertComponent from "components/AlertComponent/AlertComponent"
import ProfileInfoWrapper from "components/ProfileInfoWrapper/ProfileInfoWrapper"
import ProfileRatingWrapper from "components/ProfileRatingWrapper/ProfileRatingWrapper"
import ProfileNewTask from "components/ProfileNewTask/ProfileNewTask"
import "./style.css"

interface AdminProfileLayoutProps {
    a: IAdmin | object;
}

const AdminProfileLayout = ({ a }: AdminProfileLayoutProps) => {

    const [admin, setAdmin] = useState(a)
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
    const [showTaskAlert, setShowTaskAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)
    const [showChangePopup, setShowChangePopup] = useState<boolean>(false)
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
    const [showNewTaskPopup, setShowNewTaskPopup] = useState<boolean>(false)

    const handldeShowChange = useCallback(() => setShowChangePopup((showPopup) => !showPopup), [])
    const handldeShowDelete = useCallback(() => setShowDeletePopup((showPopup) => !showPopup), [])
    const handldeShowNewTask = useCallback(() => setShowNewTaskPopup((showPopup) => !showPopup), [])

    const { 
        adminsStore: { changePassword, deleteAccount }, 
        usersStore: { topFiveUsers, foolDeveloper } ,
    } = useStores()
    
    const handleChangePassword = useCallback((val: string) => {
        let tmp: IAdmin = JSON.parse(JSON.stringify(admin))
        tmp.password = val
        setAdmin(tmp)
        changePassword(tmp, val)
        setShowSuccessAlert(true)
        setTimeout(() => setShowSuccessAlert(false), 5000)
    }, [])

    const handleDeleteAccount = () => {
        let tmp: IAdmin = JSON.parse(JSON.stringify(admin))
        deleteAccount(tmp.id)
        logOut(LOG_ADMIN)
    }

    if (!isAdmin(admin)) return <Spinner/>

    return (
        <>
            <AlertComponent
                successTitle = {"Пароль успешно изменён!"}
                showSuccess = {showSuccessAlert}
                showError = {showErrorAlert}
            />
            <AlertComponent
                successTitle = {"Поздравляю! Вы тиран"}
                showSuccess = {showTaskAlert}
                showError = {showErrorAlert}
            />
            <div className = "adminProfile__wrapper">
                <div className = "adminProfile__wrapper-container">
                    <ProfileInfoWrapper
                        data = {admin}
                        handleShowChangePopup = {handldeShowChange}
                        handleShowDeletePopup = {handldeShowDelete}
                    />
                    <ProfileNewTask
                        handleShowPopup = {handldeShowNewTask}
                    />
                    <ProfileRatingWrapper
                        topFiveUsers = {topFiveUsers}
                        foolDeveloper = {foolDeveloper}
                    />
                </div>
            </div>
            {
                showChangePopup ? 
                    <ChangePassword
                        oldPassword = {admin.password}
                        handleChangePassword = {handleChangePassword}
                        handleShowPopup = {handldeShowChange}
                        setShowErrorAlert = {setShowErrorAlert}
                    /> 
                    : null
            }
            {
                showDeletePopup ?
                    <DeleteAccount
                        userPass = {admin.password}
                        handleDeleteAccount = {handleDeleteAccount}
                        handleShowPopup = {handldeShowDelete}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
            {
                showNewTaskPopup ? 
                    <CreateNewTask
                        handleShowPopup = {handldeShowNewTask}
                        setShowTaskAlert = {setShowTaskAlert}
                        setShowErrorAlert = {setShowErrorAlert}
                    />
                    : null
            }
        </>
    )
}

export default observer(AdminProfileLayout)