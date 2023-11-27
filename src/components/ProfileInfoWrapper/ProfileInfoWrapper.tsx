import { memo } from "react"
import { IUser, IAdmin } from "models"
import Typography from "@mui/material/Typography"

interface ProfileInfoWrapperProps {
    data: IUser | IAdmin;
    handleShowChangePopup: () => void;
    handleShowDeletePopup: () => void;
}

const ProfileInfoWrapper = ({ data, handleShowChangePopup, handleShowDeletePopup }: ProfileInfoWrapperProps) => {

    return (
        <>
            <div className = "adminProfile__wrapper-info__wrapper common-profile__wrapper">
                <div className = "info-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Информация об аккаунте
                    </Typography>
                </div>
                <div className = "info-wrapper__body" style = {{paddingLeft: "15px"}}>
                    <div className = "info-wrapper__body-text">
                        <Typography gutterBottom variant="h6" component="div" style = {{marginTop: "20px"}}>
                            {data.name} - {data.rang} {data.is === "developer" ? "developer" : null}
                        </Typography>
                        <Typography sx={{ marginBottom: "15px" }} color="text.secondary">
                            Логин: @{data.login}
                        </Typography>
                        <Typography color="text.secondary">
                            ID в системе: {data.id}
                        </Typography>
                        {
                            data.is === "developer" ? 
                                <>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Рейтинг: {data.rating}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Выполненных задач: {data.completeTodos.length}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Просроченных задач: {data.overdueTodos.length}
                                    </Typography>
                                </> : null
                        }
                    </div>
                            
                    <div className = "info-wrapper__body-buttons" style = {{paddingTop: "20px"}}>
                        <div>
                            <button 
                                className = "info-wrapper__body-buttons__item item1"
                                onClick = {handleShowChangePopup}
                            >
                                изменить пароль
                            </button>
                        </div>
                        <div style = {{paddingTop: "8px"}}>
                            <button 
                                className = "info-wrapper__body-buttons__item item2"
                                onClick = {handleShowDeletePopup}
                            >
                                удалить аккаунт
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ProfileInfoWrapper)