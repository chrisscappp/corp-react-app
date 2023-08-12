import { memo, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"

type ConfirmDismissFormValues = {
    developerName: string;
    repeatDeveloperName: string;
}

interface ConfirmDismissProps {
    foolName: string;
    handleDismiss: () => void;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    setShowSuccessAlert: Dispatch<SetStateAction<boolean>>;
    setShowErrorAlert: Dispatch<SetStateAction<boolean>>;
}

const ConfirmDismiss = ({ foolName, handleDismiss, setShowSuccessAlert, setShowErrorAlert, setShowPopup }: ConfirmDismissProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ConfirmDismissFormValues>()

    const handleShowPopup = () => setShowPopup((showPopup) => !showPopup)

    const checkDismiss = (data: ConfirmDismissFormValues) => {
        if ((data.developerName === data.repeatDeveloperName) && foolName === data.developerName) {
            setShowSuccessAlert(true)
            handleShowPopup()
            handleDismiss()
            setTimeout(() => setShowSuccessAlert(false), 5000)
        } else {
            setShowErrorAlert(true)
            handleShowPopup()
            setTimeout(() => setShowErrorAlert(false), 5000)
        }
    }

    return (
        <>
            <Popup close = {handleShowPopup}>
                <form onSubmit={handleSubmit(checkDismiss)}>
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
                    <Typography color="text.secondary">
                        После увольнения аккаунт пользователя не подлежит восстановлению!
                    </Typography>
                    <div className = "field-wrapper" style = {{marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Введите имя сотрудника" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%"}}
                            {...register("developerName", {
                                required: true,
                            })}
                        />
                        {errors.developerName && errors.developerName.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <TextField 
                            id="outlined-basic" 
                            label="Повторите имя сотрудника" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%", marginTop: "10px"}}
                            {...register("repeatDeveloperName", {
                                required: true,
                            })}
                        />
                        {errors.repeatDeveloperName && errors.repeatDeveloperName.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                    </div>
                    <button className = "delete-account__button" type="submit" value="submit">
                        уволить сотрудника
                    </button>
                </form>
            </Popup>
        </>
    )
}

export default memo(ConfirmDismiss)