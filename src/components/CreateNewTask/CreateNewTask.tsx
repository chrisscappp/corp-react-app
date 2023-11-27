import { Dispatch, SetStateAction, useState } from "react"
import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"
import { CreateNewTaskValues, ITodo, Rangs } from "models"
import { useStores } from "hooks/rootStoreContext"
import { generateId } from "utils/generateId"
import Popup from "../Popup/Popup"
import MenuItem from "@mui/material/MenuItem"
import SelectComponent from "../SelectComponent/SelectComponent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import { isCreateTodoFunc } from "utils/typeGuards"
import "./style.css"

interface CreateNewTaskProps {
    handleShowPopup: () => void;
    setShowTaskAlert: Dispatch<SetStateAction<boolean>>;
    setShowErrorAlert: Dispatch<SetStateAction<boolean>>;
    handleTest?: ((todo: ITodo) => void) | undefined;
}

const selectProp = {
    rangs: { inputLabel: "Рекомендованный ранг", helperText: "" },
}

const CreateNewTask = ({ handleShowPopup, setShowTaskAlert, setShowErrorAlert, handleTest }: CreateNewTaskProps) => {

    const [rang, setRang] = useState<Rangs | "">("")
    
    const { commandsStore: { createNewTodo } } = useStores()
    
    const { register, handleSubmit, formState: { errors } } = useForm<CreateNewTaskValues>()

    const handleCreateTodo = (data: CreateNewTaskValues) => {
        if (rang !== "") {
            const i = generateId()
            const obj: ITodo = {
                id: i,
                title: data.title,
                body: data.body,
                complete: false,
                verified: false,
                start: false,
                userId: "",
                recommendedRang: rang,
                score: data.score,
            }
            if (isCreateTodoFunc(handleTest)) {
                handleTest(obj)
                setShowTaskAlert(true)
                handleShowPopup()
                setTimeout(() => setShowTaskAlert(false), 5000)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                createNewTodo(obj)
                setShowTaskAlert(true)
                handleShowPopup()
                setTimeout(() => setShowTaskAlert(false), 5000)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } else {
            setShowErrorAlert(true)
            handleShowPopup()
            setTimeout(() => setShowErrorAlert(false), 5000)
        }
    }
    
    return (
        <>
            <Popup close = {handleShowPopup}>
                <form onSubmit={handleSubmit(handleCreateTodo)}>
                    <div style = {{display: "flex", justifyContent: "space-between"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            Новая задача
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
                            label="Введите заголовок задачи" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%"}}
                            {...register("title", {
                                required: true,
                            })}
                        />
                        {errors.title && errors.title.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <TextField 
                            id="outlined-basic" 
                            label="Краткое описание задачи" 
                            variant="outlined" 
                            size="small" 
                            rows={4}
                            style={{width: "100%", marginTop: "10px"}}
                            {...register("body", {
                                required: true,
                            })}
                        />
                        {errors.body && errors.body.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <TextField 
                            id="outlined-basic" 
                            label="Количество очков за выполнение" 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%", marginTop: "10px"}}
                            {...register("score", {
                                required: true,
                            })}
                        />
                        {errors.score && errors.score.type === "required" && (
                            <Typography className = "empty-error">Поле не должно быть пустым</Typography>
                        )}
                        <SelectComponent selectProp = {selectProp.rangs} her = {setRang}>
                            <MenuItem value={"Junior"}>Junior</MenuItem>
                            <MenuItem value={"Middle"}>Middle</MenuItem>
                            <MenuItem value={"Senior"}>Senior</MenuItem>
                        </SelectComponent>
                        {rang === "" ? <Typography className = "empty-error">Поле не должно быть пустым</Typography> : null}
                    </div>
                    <button className = "create__button" type="submit" value="submit">
                        вжух!
                    </button>
                </form>
            </Popup>
        </>
    )
}

export default observer(CreateNewTask)