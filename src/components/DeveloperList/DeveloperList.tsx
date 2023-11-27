import { observer } from "mobx-react-lite"
import { ITodo, IUser } from "models"
import Typography from "@mui/material/Typography"
import DeveloperItem from "../DeveloperItem/DeveloperItem"
import Pagination from "@mui/material/Pagination"
import { useStores } from "hooks/rootStoreContext"
import { isAdmin } from "utils/typeGuards"
import { useEffect, useState } from "react"
import WrongModal from "components/WrongModal/WrongModal"
import "./style.css"

const GOOD_COLOR = "rgb(186, 227, 202)"
const STOP_COLOR = "rgb(222, 171, 171)" 

interface DeveloperListProps {
    users: IUser[];
    pageCount: number;
    handleChangePage: (e: any, page: number) => void;
    handlePush: (user: IUser, task: ITodo) => void;
}

const DeveloperList = ({ users, pageCount, handleChangePage, handlePush }: DeveloperListProps) => {

    const [showWrong, setShowWrong] = useState(false)

    const { adminsStore: { admin, removeTakenTodo } } = useStores()

    const dragOverHandler = (e: any, dev: IUser) => {
        e.preventDefault()
        const str = "developerItem__wrapper-container"
        if (e.target.className === str) {
            const ts = localStorage.getItem("TEST")
            if (ts) {
                const task: ITodo = JSON.parse(ts)
                switch (task.recommendedRang) {
                    case "Senior": {
                        if (dev.rang === "Senior") {
                            e.target.style.backgroundColor = GOOD_COLOR
                        } else {
                            e.target.style.backgroundColor = STOP_COLOR
                        }
                        break;
                    }
                    case "Middle": {
                        if (dev.rang === "Middle" || dev.rang === "Senior") {
                            e.target.style.backgroundColor = GOOD_COLOR
                        } else {
                            e.target.style.backgroundColor = STOP_COLOR
                        }
                        break;
                    }
                    case "Junior": {
                        e.target.style.backgroundColor = GOOD_COLOR
                        break;
                    }
                }
            }   
        }
    }

    const dragLeaveHandler = (e: any) => {
        e.preventDefault()
        const str = "developerItem__wrapper-container"
        if (e.target.className === str) e.target.style.backgroundColor = "rgb(230, 230, 230)"
    }

    const handleDrop = (event: any, user: IUser) => {
        const str = "developerItem__wrapper-container"
        if (event.target.className === str) {
            if (event.target.style.backgroundColor === GOOD_COLOR) {
                const ts = localStorage.getItem("TEST")
                if (ts) {
                    handlePush(user, JSON.parse(ts))
                    removeTakenTodo(isAdmin(admin) ? admin.id : "0", JSON.parse(ts))
                }
            } else {
                setShowWrong(true)
            }
            event.target.style.backgroundColor = "rgb(230, 230, 230)"
        }
        localStorage.removeItem("TEST")
    }

    return (
        <>
            <div className = "common-profile__wrapper" style = {{marginBottom: "20px"}}>
                <div className = "info-wrapper__header developerlist-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Разработчики
                    </Typography>
                    <div 
                        className = "info-wrapper__body todolist-wrapper"
                    >
                        {
                            users.length > 0 ?
                                <>
                                    {users.map((d: IUser) => {
                                        return (
                                            <div 
                                                key = {d.id} 
                                                className = "todoItem__wrapper"
                                                onDrop={(e) => handleDrop(e, d)}  
                                                onDragOver={(e) => dragOverHandler(e, d)}
                                                onDragLeave={(e) => dragLeaveHandler(e)}
                                            >
                                                <DeveloperItem
                                                    developer = {d}
                                                />
                                            </div>
                                        )
                                    })}
                                    <Pagination 
                                        count={pageCount} 
                                        onChange = {handleChangePage}
                                        size = {"medium"}
                                        className = "footer__pagination"
                                    />
                                </> 
                                : <Typography gutterBottom variant="h6" component="div">
                                    В команде никого нет
                                </Typography>
                        } 
                    </div>
                </div>
            </div>
            {
                showWrong ?
                <WrongModal
                    setShowPopup={setShowWrong}
                    title={"Несоответствие по рангам!"}
                /> : null
            }
        </>
    )
}

export default observer(DeveloperList)