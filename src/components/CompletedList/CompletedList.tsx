import { Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { CompleteTodo, ITodo } from "models"
import { isTodo } from "utils/typeGuards";

type Test = ITodo[] | CompleteTodo[]

interface CompletedListProps {
	todos: Test;
}

const CompletedList = ({ todos }: CompletedListProps) => {
	return (
		<>
			<div className = "completedList__wrapper">
				<div className = "completedList-wrapper__header">
					<Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Выполненные задачи
                    </Typography>
				</div>
				<div className = "info-wrapper__body todolist-wrapper">
					{
						isTodo(todos[0]) ?
						todos.map(todo => {
							return (
								<>
									<div className = "completeTodo__item">
										{todo.title}
									</div>
								</>
							)
						}) : todos.map(todo => {
							return (
								<>
									<div>
										{todo.title}
									</div>
								</>
							)
						})
					}
				</div>
			</div>
		</>
	)
}

export default observer(CompletedList)