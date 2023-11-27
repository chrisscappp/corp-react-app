import { ITodo, IUser } from "models";
import { TASKS_SORT_KEYS, DEVS_SORT_KEYS, MY_TASKS_SORT_KEYS } from "./sortKeys";

export function sortTasksByKey (key: TASKS_SORT_KEYS, array: ITodo[]) {
    switch (key) {
    case TASKS_SORT_KEYS.BY_TITLE: {
        return array.sort((prev, next) => ("" + prev.title).localeCompare(next.title))
    }
    case TASKS_SORT_KEYS.BY_COMPLETE_SCORE: {
        return array.sort((prev, next) => next.score - prev.score)
    }
    case TASKS_SORT_KEYS.BY_RANG_JUNIOR: {
        return array.sort((prev, next) => (next.recommendedRang === "Junior" ? next.recommendedRang : "").localeCompare(next.recommendedRang))
    }
    case TASKS_SORT_KEYS.BY_RANG_MIDDLE: {
        return array.sort((prev, next) => (next.recommendedRang === "Middle" ? next.recommendedRang : "").localeCompare(next.recommendedRang))
    }
    case TASKS_SORT_KEYS.BY_RANG_SENIOR: {
        return array.sort((prev, next) => (next.recommendedRang === "Senior" ? next.recommendedRang : "").localeCompare(next.recommendedRang))
    }
    default: return array
    }
}

export function filterDevelopersByKey(key: DEVS_SORT_KEYS, array: IUser[]) {
    switch(key) {
    case DEVS_SORT_KEYS.BY_JUNIOR: {
        return array.filter(d => d.rang === "Junior")
    }
    case DEVS_SORT_KEYS.BY_MIDDLE: {
        return array.filter(d => d.rang === "Middle")
    }
    case DEVS_SORT_KEYS.BY_SENIOR: {
        return array.filter(d => d.rang === "Senior")
    }
    case DEVS_SORT_KEYS.BY_HIGH_RATING: {
        return array.sort((prev, next) => next.rating - prev.rating)
    }
    case DEVS_SORT_KEYS.BY_LOW_RATING: {
        return array.sort((prev, next) => prev.rating - next.rating)
    }
    case DEVS_SORT_KEYS.BY_TAKEN_TASKS: {
        return array.filter(d => d.todos.length > 0)
    }
    case DEVS_SORT_KEYS.BY_TASKS_COUNT: {
        return array.sort((prev, next) => next.todos.length - prev.todos.length)
    }
    
    default: return array
    }
}