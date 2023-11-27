import { ITodo } from "models"
import { observer } from "mobx-react-lite";
import Typography from "@mui/material/Typography"
import "./style.css"
import { useStores } from "hooks/rootStoreContext";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TodoItemProps {
    todo: ITodo;
    handleStartTodo: (todo: ITodo) => void;
    handleOverdueTodo: (todo: ITodo) => void;
    handleVerifiedTodo: (todo: ITodo) => void;
}

const TodoItem = ({ todo, handleStartTodo, handleOverdueTodo, handleVerifiedTodo }: TodoItemProps) => {

    return (
        <>
            <div className = "todoItem__wrapper-container" >
                <div className = "todoItem__wrapper-container__left">
                    <div className = "todoItem__wrapper-container-header">
                        <Typography gutterBottom variant="h6" component="div" style = {{padding: "8px 0px 0px 15px"}}>
                            {todo.title}
                        </Typography>
                    </div>
                    <div className = "todoItem__wrapper-container-body">
                        <Typography color="#212121" style = {{padding: "0px 0px 0px 15px"}}>
                            {todo.body}
                        </Typography>
                        <Typography color="#212121" style = {{padding: "7px 0px 15px 15px"}}>
                            Количество очков за выполнение: {todo.score}
                        </Typography>
                    </div>
					<div className = "todoItem__wrapper-container-footer">
						<button 
                            className = "myTodo__button btn-good"
                            onClick = {() => handleVerifiedTodo(todo)}
                        >
                            сделано
                        </button>
						<button 
                            className = "myTodo__button btn-no"
                            onClick = {() => handleOverdueTodo(todo)}
                        >
                            не справился
                        </button>
						<button 
                            className = "myTodo__button btn-go"
                            onClick = {() => handleStartTodo(todo)}
                        >
                            начать выполнение
                        </button>
					</div>
                </div>
            </div>
        </>
    )
}

export default observer(TodoItem)