import { IUser, WhoLogType } from "models"
import { useParams } from 'react-router-dom'
import { findByKey } from "utils/findByKey";
import MyTodoList from "components/MyTodoList/MyTodoList";

interface ShowUserTasksProps {
	users: IUser[];
	whoLog: WhoLogType;
}

const ShowUserTasks = ({ users, whoLog }: ShowUserTasksProps) => {

	const { id } = useParams()
	const developer = findByKey(users, "id", id ? id : "")

	return (
		<>
			<div className = "my__todos__wrapper">
                <div className = "my__todos__wrapper-container" style = {{marginTop: "10px"}}>
                    <MyTodoList
						flag = {true}
                        todos = {developer ? developer.todos : []}
						whoLog = {whoLog}
                    />
                </div>
            </div>
		</>
	)
}

export default ShowUserTasks