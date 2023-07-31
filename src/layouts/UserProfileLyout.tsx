import { memo } from "react"
import { IUser } from "../models"
import { isUser } from "../utils/typeGuards"
import { useNavigate } from "react-router-dom"
import { LOG_USER } from "../utils/localStorageKeys"
import { logOut } from "../utils/logOut"
import Spinner from "../components/Spinner/Spinner"

interface UserProfileLayoutProps {
    user: IUser | object;
}

const UserProfileLayout = ({ user }: UserProfileLayoutProps) => {

    const navigate = useNavigate()
    const handleLogOut = () => logOut(LOG_USER)

    if (!isUser(user)) return <Spinner/>

    return (
        <>
            <div>
                <div>
                    {user.name} - {user.rang}
                </div>
                <button onClick = {() => navigate("/info")}>
                    К инфо
                </button>
                <button onClick = {handleLogOut}>
                    Выйти
                </button>
            </div>
        </>
    )
}

export default memo(UserProfileLayout)