export type Rangs = "Junior" | "Middle" | "Senior" | "Team Lead" | ""

export type WhoLogType = "lead" | "developer"

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

export interface ITodo {
    id: number;
    title: string;
    body: string;
    complete: boolean;
    userId?: number;
    recommendedRang: Rangs;
    score: number;
}

export type CompleteTodo = Pick<ITodo, "id" | "title" | "score">
export type OverdueTodo = CompleteTodo

export interface IUser {
    id: number;
    login: string;
    password: string;
    token: string
    name: string;
    rang: Rangs;
    is: "developer"
    rating: number;
    todos: ITodo[];
    completeTodos: CompleteTodo[];
    overdueTodos: OverdueTodo[]
}

export interface IAdmin {
    id: number;
    login: string;
    password: string;
    token: string;
    name: string;
    is: "lead";
    todos: ITodo[];
    rang: "Team Lead"
}