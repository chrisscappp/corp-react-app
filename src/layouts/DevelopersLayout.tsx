import { useStores } from "hooks/rootStoreContext"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useCurrentItems } from "hooks/paginationDevelopers"
import { filterDevelopersByKey } from "utils/sortByKey"
import { DEVS_SORT_KEYS } from "utils/sortKeys"
import { devsSortArr, devsSortProp } from "utils/sortView"
import { DEVS_IN_PAGE } from "utils/constants"
import { ITodo, IUser } from "models"
import DeveloperList from "components/DeveloperList/DeveloperList"
import SortSelector from "components/SortSelector/SortSelector"
import Error from "components/Error/Error"
import Spinner from "components/Spinner/Spinner"
import "./style.css"

const MyTasksLayout = () => {

    const { usersStore: {
        getUsersAction, users, isLoading, error, pushTodoToUser
    } } = useStores()

    useEffect(() => {
        getUsersAction()
    }, [])

    const [itemOffset, setItemOffset] = useState(0)
    const { currentItems } = useCurrentItems(users, itemOffset, DEVS_IN_PAGE)
    const pageCount = Math.ceil(users.length / DEVS_IN_PAGE)

    const handleChangePage = (e: any, page: number) => {
        const newOffset = ((page - 1) * DEVS_IN_PAGE) % users.length
        setItemOffset(newOffset)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [filteredDevs, setFilteredDevs] = useState(currentItems)

    const sortDevs = (key: string) => {
        let t = JSON.parse(JSON.stringify(users))
        let tmp = filterDevelopersByKey(key as DEVS_SORT_KEYS, t)
        setFilteredDevs(tmp)
    }

    const handlePushTodoToUser = async (user: IUser, task: ITodo) => {
        await pushTodoToUser(user, task).then((res: IUser[]) => {
            setFilteredDevs(res)
        })
    }

    useEffect(() => {
        setFilteredDevs(currentItems)
    }, [itemOffset])

    if (isLoading) return <Spinner/>
    if (error) return <Error message = {error}/>

    return (
        <>
            <div className = "developers__wrapper">
                <div className = "developers__wrapper-container">
                    <SortSelector
                        sortProp = {devsSortProp}
                        viewItems = {devsSortArr}
                        sortTasks = {sortDevs}
                    />
                    <DeveloperList
                        users = {filteredDevs}
                        pageCount = {pageCount}
                        handleChangePage = {handleChangePage}
                        handlePush = {handlePushTodoToUser}
                    />
                </div>
            </div>
        </>
    )
}

export default observer(MyTasksLayout)