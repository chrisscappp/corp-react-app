import { observer } from "mobx-react-lite"
import { useStores } from "../../hooks/rootStoreContext"
import { useEffect, useState } from "react"
import { ITodo, IAdmin } from "../../models"
import { isAdmin } from "../../utils/typeGuards"
import Spinner from "../Spinner/Spinner"
import "./style.css"

interface TodosLayoutProps {
    a: IAdmin | object;
}

const AdminTools = ({ a }: TodosLayoutProps) => {

    const [admin, setAdmin] = useState(a)
    const [coordX, setCoordX] = useState(8)
    const [coordY, setCoordY] = useState(15)

    const {
        todosStore: {
            getTodosAction, todos,
        }, 
        adminsStore: {
            getTakenTodosAction, takenTodos, pickTodo,
        },
    } = useStores()

    useEffect(() => {
        getTodosAction()
        getTakenTodosAction(isAdmin(admin) ? admin.id : 0)
    }, [])

    //console.log(takenTodos[0]?.body)

    const handleDragStart = (e: any) => {
        //console.log(e.clientX, e.clientY)

    }

    const handleDragLeave = (e: any) => {
        //console.log(e)
    }

    const handleDragEnd = (e: any) => {
        e.target.style.background = "aqua"
        //console.log(e)
        setCoordX(e.clientX)
        setCoordY(e.clientY)
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
        e.target.style.background = "red"
        //console.log(e.clientX, e.clientY)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        //console.log(e.clientX, e.clientY)
    }

    //console.log(coordX, coordY)

    return (
        <>
            <div 
                className = "admin-tools__wrapper"
                style = {{left: `${coordY}px`, top: `${coordX}`}}
                draggable = {true}
                onDragStart = {(e: any) => handleDragStart(e)}
                onDragLeave = {(e: any) => handleDragLeave(e)}
                onDragEnd={(e: any) => handleDragEnd(e)}
                onDragOver={(e: any) => handleDragOver(e)}
                onDrop={(e: any) => handleDrop(e)}
            >
                +
            </div>
        </>
    )
}

export default observer(AdminTools)