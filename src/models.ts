import { DEVS_SORT_KEYS, TASKS_SORT_KEYS } from "utils/sortKeys";

export type Rangs = "Junior" | "Middle" | "Senior" | "Team Lead" | ""

export type WhoLogType = "lead" | "developer"

export type SortPropType = {
    inputLabel: string;
    helperText: string;
}

export type TasksSortViewType = {
    title: string;
    key: TASKS_SORT_KEYS | DEVS_SORT_KEYS
}

export type DevsSortViewType = {
    title: string;
    key: DEVS_SORT_KEYS
}

export enum AdminToolsPopupId {
    NOTIFICATIONS = "NOTIFICATIONS",
    REMAINS_TODOS = "REMAINS_TODOS",
    REMAINS_DEVELOPERS = "REMAINS_DEVELOPERS",
    ADMIN_TASKS = "ADMIN_TASKS",
    EMPTY_ID = ""
}

export enum ProfilePopupId {
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
    NEW_TASK = "NEW_TASK",
    EMPTY_ID = ""
}

export type EnterFormValues = {
    login: string; 
    password: string;
}

export type RegFormValues = { 
    name: string;
    login: string;
    password: string; 
}

export type CreateNewTaskValues = {
    title: string,
    body: string,
    score: number,
    recommendedRang: string,
}

export interface ITeam {
    id: string;
    name: string;
    todos: ITodo[];
    gotTodos: ITodo[];
}

export interface ITodo {
    id: string;
    title: string;
    body: string;
    complete: boolean;
    verified: boolean;
    start: boolean,
    userId: string;
    recommendedRang: Rangs;
    score: number;
}

export interface INotification {
    id: string;
    title: string;
    date: Date;
    viewed: boolean;
}

export type CompleteTodo = Pick<ITodo, "id" | "title" | "score">
export type OverdueTodo = CompleteTodo

export interface IUser {
    id: string;
    login: string;
    password: string;
    token: string
    name: string;
    teamId: string;
    rang: Rangs;
    is: "developer"
    rating: number;
    todos: ITodo[];
    completeTodos: CompleteTodo[];
    overdueTodos: OverdueTodo[]
}

export interface IAdmin {
    id: string;
    login: string;
    password: string;
    token: string;
    name: string;
    is: "lead";
    todos: ITodo[];
    notifications: INotification[];
    rang: "Team Lead";
}