import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { IAdmin } from "../models"
import { isAdmin } from "../utils/typeGuards"
import { LOG_ADMIN } from "../utils/localStorageKeys"
import { logOut } from "../utils/logOut"
import Spinner from "../components/Spinner/Spinner"

interface AdminProfileLayoutProps {
    admin: IAdmin | object;
}

const AdminProfileLayout = ({ admin }: AdminProfileLayoutProps) => {

    const navigate = useNavigate()

    const handleLogOut = () => logOut(LOG_ADMIN)

    if (!isAdmin(admin)) return <Spinner/>

    return (
        <>
            <div>
                <div>
                    {admin.name} - {admin.rang}
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

export default memo(AdminProfileLayout)