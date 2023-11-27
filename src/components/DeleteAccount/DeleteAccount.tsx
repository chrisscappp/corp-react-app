import { memo, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import "./style.css"

interface DeleteAccountProps {
    userPass: string;
    handleDeleteAccount: () => void;
    handleShowPopup: () => void;
    setShowErrorAlert: Dispatch<SetStateAction<boolean>>;
}

type DeleteAccountFormValues = {
    pass: string,
    repeatPass: string,
}

const DeleteAccount = ({userPass, handleDeleteAccount, handleShowPopup, setShowErrorAlert}: DeleteAccountProps) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<DeleteAccountFormValues>()

    const checkPassword = (data: DeleteAccountFormValues) => {
        if ((data.pass === data.repeatPass) && userPass === data.pass) {
            handleDeleteAccount()
        } else {
            setShowErrorAlert(true)
            handleShowPopup()
            setTimeout(() => setShowErrorAlert(false), 5000)
        }
    }

    return (
        <>
            <Popup close = {handleShowPopup}>
                <form onSubmit={handleSubmit(checkPassword)}>
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
                        После удаления аккаунт не подлежит восстановлению!
                    </Typography>
                    <div className = "field-wrapper" style = {{marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Введите пароль" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%"}}
                            {...register("pass", {
                                required: true,
                            })}
                        />
                        {errors.pass && errors.pass.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <TextField 
                            id="outlined-basic" 
                            label="Повторите пароль" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%", marginTop: "10px"}}
                            {...register("repeatPass", {
                                required: true,
                            })}
                        />
                        {errors.repeatPass && errors.repeatPass.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                    </div>
                    <button className = "delete-account__button" type="submit" value="submit">
                        удалить аккаунт
                    </button>
                </form>
            </Popup>
        </>
    )
}

export default memo(DeleteAccount)