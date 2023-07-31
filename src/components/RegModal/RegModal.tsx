import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField"
import MenuItem from '@mui/material/MenuItem';
import SelectComponent from '../SelectComponent/SelectComponent';
import { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Rangs, RegFormValues, IUser, IAdmin } from '../../models';
import { useForm } from "react-hook-form"
import { style } from "./style"
import "./style.css"

// дописать в сторях ф-ии добавления нового

interface RegModalProps { 
    users: IUser[];
    admins: IAdmin[];
    handleShow: () => void; 
}

const selectProp = {
    rangs: { inputLabel: "Должность", helperText: "Ваша должность в команде" },
}

const RegModal = ({ handleShow }: RegModalProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<RegFormValues>()
    const [rang, setRang] = useState<Rangs | "">("")

    function regUser(data: RegFormValues) {
        if (rang !== "") {
            
            if (rang === Rangs.TEAM_LEAD) {
                console.log(data, rang)
            }
        } else {
            alert("Заполните все поля")
        }
    }

    return (
        <>
            <Modal
                open={true}
                onClose={handleShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit(regUser)}>
                    <Box sx={style}>
                        <div style = {{display: 'flex', justifyContent: "space-between"}}>
                            <Typography gutterBottom variant="h5" component="div">
                                Регистрация
                            </Typography>
                            <span className = "close__span">
                                <CloseIcon 
                                    onClick = {handleShow}
                                    fontSize='medium'
                                />
                            </span>
                        </div>
                        <div className = "field-wrapper">
                            <TextField 
                                id="outlined-basic" 
                                label="Имя и фамилия (Иван Иванов)" 
                                variant="outlined" 
                                size="small" 
                                style={{width: "100%"}}
                                {...register("name", {
                                    required: true,
                                    pattern: /[А-Я][а-я]+(\s|,)[А-Я][а-я]/,
                                })}
                            />
                            {errors.name && errors.name.type === "required" && (
                                <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                            )}
                            {errors.name && errors.name.type === "pattern" && (
                                <Typography className = "empty-error">Имя неккоректно</Typography>
                            )}
                            <TextField 
                                id="outlined-basic" 
                                label="Логин" 
                                variant="outlined" 
                                size="small" 
                                style={{width: "100%", marginTop: "10px"}}
                                {...register("login", {
                                    required: true,
                                })}
                            />
                            {errors.login && errors.login.type === "required" && (
                                <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                            )}
                            <SelectComponent selectProp = {selectProp.rangs} her = {setRang}>
                                <MenuItem value={Rangs.JUNIOR}>{Rangs.JUNIOR}</MenuItem>
                                <MenuItem value={Rangs.MIDDLE}>{Rangs.MIDDLE}</MenuItem>
                                <MenuItem value={Rangs.SENIOR}>{Rangs.SENIOR}</MenuItem>
                                <MenuItem 
                                    value={Rangs.TEAM_LEAD} 
                                    
                                >
                                    {Rangs.TEAM_LEAD}
                                </MenuItem>
                            </SelectComponent>
                            {rang === "" ? <Typography className = "empty-error">Поле не должно быть пустым</Typography> : null}
                            <TextField 
                                id="outlined-basic" 
                                label="Пароль" 
                                variant="outlined" 
                                size="small" 
                                style={{width: "100%", marginTop: "10px"}}
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                            )}
                        </div>
                        <button className = "reg__button" type="submit" value="submit">
                            зарегестрироваться
                        </button>
                    </Box>
                </form>
            </Modal>
        </>
    )
}

export default observer(RegModal)