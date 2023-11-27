import { memo, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloseIcon from '@mui/icons-material/Close'
import "./style.css"

interface ChangePasswordProps {
    oldPassword: string;
    handleChangePassword: (val: string) => void;
    handleShowPopup: () => void;
    setShowErrorAlert: Dispatch<SetStateAction<boolean>>;
}

type ChangePasswordFormValues = {
    oldPass: string,
    newPass: string,
}

const ChangePassword = ({oldPassword, handleChangePassword, handleShowPopup, setShowErrorAlert}: ChangePasswordProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormValues>()

    const checkNewPassword = (data: ChangePasswordFormValues) => {
        if (oldPassword === data.oldPass) {
            handleChangePassword(data.newPass)
            handleShowPopup()
        } else {
            setShowErrorAlert(true)
            handleShowPopup()
            setTimeout(() => setShowErrorAlert(false), 5000)
        }
    }

    return (
        <>
            <Popup close = {handleShowPopup}>
                <form onSubmit={handleSubmit(checkNewPassword)}>
                    <div style = {{display: "flex", justifyContent: "space-between"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            Подтвердите действие
                        </Typography>
                        <span className = "close__span">
                            <CloseIcon 
                                onClick = {handleShowPopup}
                                fontSize='medium'
                            />
                        </span>
                    </div>
                    <div className = "field-wrapper" style = {{marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Старый пароль" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%"}}
                            {...register("oldPass", {
                                required: true,
                            })}
                        />
                        {errors.oldPass && errors.oldPass.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <TextField 
                            id="outlined-basic" 
                            label="Новый пароль" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%", marginTop: "10px"}}
                            {...register("newPass", {
                                required: true,
                            })}
                        />
                        {errors.newPass && errors.newPass.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                    </div>
                    <button className = "change__button" type="submit" value="submit">
                        изменить пароль
                    </button>
                </form>
            </Popup>
        </>
    )
}

export default memo(ChangePassword)