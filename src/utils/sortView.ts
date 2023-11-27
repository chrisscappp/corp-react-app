import { TASKS_SORT_KEYS, DEVS_SORT_KEYS, MY_TASKS_SORT_KEYS } from "utils/sortKeys"
import { TasksSortViewType, DevsSortViewType, SortPropType } from "models"

export const taskSortProp: SortPropType = {
	inputLabel: "Сортировка по", 
    helperText: "Сортировка списка задач",
}

export const devsSortProp: SortPropType = {
	inputLabel: "Фильтр по", 
    helperText: "Фильтр разработчиков",
}

export const tasksSortArr: TasksSortViewType[] = [
	{ title: "алфавиту", key: TASKS_SORT_KEYS.BY_TITLE },
	{ title: "количеству очков", key: TASKS_SORT_KEYS.BY_COMPLETE_SCORE },
	{ title: "сложности Junior", key: TASKS_SORT_KEYS.BY_RANG_JUNIOR },
	{ title: "сложности Middle", key: TASKS_SORT_KEYS.BY_RANG_MIDDLE },
	{ title: "сложности Senior", key: TASKS_SORT_KEYS.BY_RANG_SENIOR }
]

export const devsSortArr: DevsSortViewType[] = [
	{ title: "Junior", key: DEVS_SORT_KEYS.BY_JUNIOR },
	{ title: "Middle", key: DEVS_SORT_KEYS.BY_MIDDLE },
	{ title: "Senior", key: DEVS_SORT_KEYS.BY_SENIOR },
	{ title: "высокому рейтингу", key: DEVS_SORT_KEYS.BY_HIGH_RATING },
	{ title: "низкому рейтингу", key: DEVS_SORT_KEYS.BY_LOW_RATING },
	{ title: "взятым задачам", key: DEVS_SORT_KEYS.BY_TAKEN_TASKS },
	{ title: "количеству взятых задач", key: DEVS_SORT_KEYS.BY_TASKS_COUNT },
]