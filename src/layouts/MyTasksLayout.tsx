import { useStores } from "hooks/rootStoreContext"
import { IUser } from "models"
import MyTodoList from "components/MyTodoList/MyTodoList";
import "./style.css"

interface MyTasksLayoutProps {
    u: IUser;
}

const MyTasksLayout = ({ u }: MyTasksLayoutProps) => {



    return (
        <>
            <div className = "my__todos__wrapper">
                <div className = "my__todos__wrapper-container" style = {{marginTop: "10px"}}>
                    <MyTodoList
                        flag = {false} 
                        todos = {u.todos}
                    />
                </div>
            </div>
        </>
    )
}

export default MyTasksLayout