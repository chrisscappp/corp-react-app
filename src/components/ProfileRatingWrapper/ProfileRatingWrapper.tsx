import { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { IUser } from "models"
import { isUser } from "utils/typeGuards"
import Typography from "@mui/material/Typography"
import AlertComponent from "../AlertComponent/AlertComponent"
import ConfirmDismiss from "../ConfirmDismiss/ConfirmDismiss"
import "./style.css"

interface ProfileRatingWrapperProps {
    topFiveUsers: () => Promise<IUser[]>;
    foolDeveloper: () => Promise<IUser>;
}

const numbers: string[] = [
    "I", "II", "III", "IV", "V",
]

const ProfileRatingWrapper = ({ topFiveUsers, foolDeveloper }: ProfileRatingWrapperProps) => {

    const [users, setUsers] = useState<IUser[]>([])
    const [fool, setFool] = useState<IUser | object>({})
    const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

    useEffect(() => {
        topFiveUsers().then((res) => setUsers(res))
        foolDeveloper().then((res) => setFool(res))
    }, [])

    const handleDismissDeveloper = () => {
        alert('На почту сотруднику пришло письмо об увольнении!')
    }

    const handleWrongDeveloper = () => {
        alert('На почту сотруднику пришло предупреждение!')
    }

    return (
        <>
            <AlertComponent
                successTitle = {"Уведомление об увольнение отправлено пользователю на почту!"}
                showSuccess = {showSuccessAlert}
                showError = {showErrorAlert}
            />
            <div className = "adminProfile__wrapper-rating__wrapper common-profile__wrapper">
                <div className = "info-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Продуктивные разработчики
                    </Typography>
                </div>
                <div className = "info-wrapper__body" style = {{paddingLeft: "15px", paddingTop: "5px", paddingBottom: "15px"}}>
                    {
                        users.map((item, index) => {
                            return (
                                <Typography 
                                    key = {item.id} 
                                    gutterBottom variant="h6" 
                                    component="div" 
                                    style = {{marginTop: "5px"}}
                                >
                                    {numbers[index]}. {item.name} ({item.rang} {item.is}) - {item.rating} очков
                                </Typography>
                            )
                        })
                    }
                </div>
            </div>
            <div className = "adminProfile__wrapper-fooldev__wrapper common-profile__wrapper" style = {{marginBottom: "50px"}}>
                <div className = "info-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Кандидат на увольнение
                    </Typography>
                </div>
                <div className = "info-wrapper__body" style = {{paddingLeft: "15px", paddingTop: "5px", paddingBottom: "15px"}}>
                    <Typography gutterBottom variant="h6" component="div">
                        Самый низкий рейтинг: {isUser(fool) ? `${fool.name} (${fool.rang} ${fool.is})` : "Пусто"}
                    </Typography>
                    <button 
                        className = "info-wrapper__body-buttons__item item1" 
                        style = {{marginTop: "5px"}}
                        onClick = {() => setShowConfirmPopup(true)}
                    >
                        уволить
                    </button>
                    <button 
                        className = "item6" 
                        onClick = {handleWrongDeveloper}
                    >
                        выслать предупреждение
                    </button>
                </div>
            </div>
            {
                showConfirmPopup ?
                    <ConfirmDismiss
                        foolName = {isUser(fool) ? `${fool.name}` : "лох"}
                        handleDismiss = {handleDismissDeveloper}
                        setShowPopup = {setShowConfirmPopup}
                        setShowSuccessAlert = {setShowSuccessAlert}
                        setShowErrorAlert = {setShowErrorAlert}
                    /> : null
            }
        </>
    )
}

export default observer(ProfileRatingWrapper)