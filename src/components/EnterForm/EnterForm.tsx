import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import EnterFormButtons from "./EnterFormButtons"
import WrongPassword from "../WrongPassword/WrongPassword"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IUser, IAdmin, EnterFormValues } from "../../models"
import { findByKey } from "../../utils/findByKey"
import { LOG_USER, LOG_ADMIN } from "../../utils/localStorageKeys"
import "./style.css"

interface EnterFormProps {
    users: IUser[];
    admins: IAdmin[];
    showReg: () => void;
}

const EnterForm = ({ users, admins, showReg }: EnterFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<EnterFormValues>()

    const [showPassword, setShowPassword] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleChangeCheckbox = () => setCheckbox((checkbox) => !checkbox)

    function enterUser(data: EnterFormValues) {
        if (checkbox === false) {
            const findUser: IUser | undefined = findByKey(users, "login", data.login)
            if (findUser && findUser.password === data.password) {
                localStorage.setItem(LOG_USER, JSON.stringify(findUser))
                window.location.reload()
            } else {
                setShowPopup(true)
            }
        } else {
            const findUser: IAdmin | undefined = findByKey(admins, "login", data.login)
            if (findUser && findUser.password === data.password) {
                localStorage.setItem(LOG_ADMIN, JSON.stringify(findUser))
                window.location.reload()
            } else {
                setShowPopup(true)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(enterUser)}>
                <div className = "home__wrapper-container__modal">
                    <Card sx={{ 
                        maxWidth: 500, 
                        backgroundColor: "#F4F4F4", 
                        boxShadow: "0px 2px 3px rgb(155, 155, 155)",
                    }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Вход
                            </Typography>
                            <div className = "home__wrapper-container__modal-inputs__container">
                                <TextField 
                                    id="outlined-basic" 
                                    label="Логин" 
                                    variant="outlined" 
                                    size="small" 
                                    style={{width: "100%"}}
                                    {...register("login", {
                                        required: true,
                                    })}
                                />
                                {errors.login && errors.login.type === "required" && (
                                    <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                                )}
                                <FormControl 
                                    sx={{ width: "100%", marginTop: "15px" }} 
                                    variant="outlined" 
                                    size="small" 
                                >
                                    <InputLabel 
                                        htmlFor="outlined-adornment-password"
                                    >
                                        Пароль
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: true,
                                        })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                {errors.password && errors.password.type === "required" && (
                                    <Typography className = "empty-error">
                                        Поле не должно быть пустым
                                    </Typography>
                                )}
                            </div>
                            <FormControlLabel 
                                control={<Checkbox/>} 
                                label="Войти как Team Lead" 
                                style={{marginTop: "15px"}}
                                onClick = {handleChangeCheckbox}
                            />
                        </CardContent>
                    </Card>
                </div>
                <EnterFormButtons 
                    showReg = {showReg}
                />
            </form>
            {
                showPopup ? 
                    <WrongPassword 
                        setShowPopup = {setShowPopup}
                    /> : null
            }
        </>
    )
}

export default EnterForm