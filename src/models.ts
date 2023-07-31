export enum Rangs {
    JUNIOR = "Junior",
    MIDDLE = "Middle",
    SENIOR = "Senior",
    TEAM_LEAD = "Team Lead",
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

export interface ITodo {
    id: number;
    title: string;
    body: string;
    complete: boolean;
    userId: number;
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
    rang: Rangs.JUNIOR | Rangs.MIDDLE | Rangs.SENIOR;
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
    rang: Rangs.TEAM_LEAD;
}