import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { IAdmin, IUser } from "models"
import { isUser } from "utils/typeGuards"
import { adminIcons, userIcons, unVerifedUserIcons } from "utils/menuIcons"
import { TOKEN_KEY } from "utils/localStorageKeys"
import Spinner from "components/Spinner/Spinner"
import ProfileMenu from "components/ProfileMenu/ProfileMenu"
import Footer from "components/Footer/Footer"

interface LayoutProps {
    whoLog: IUser | IAdmin | object;
}

const Layout = ({ whoLog }: LayoutProps) => {
    return (
        <>
            {
                isUser(whoLog) ? 
                    <ProfileMenu
                        icons = {whoLog.teamId ? userIcons : unVerifedUserIcons}
                        logOutKey = {TOKEN_KEY}
                        whoLogKey = {"developer"}
                    />
                    :
                    <ProfileMenu
                        icons = {adminIcons}
                        logOutKey = {TOKEN_KEY}
                        whoLogKey = {"lead"}
                    />
            }
            <Suspense fallback = {<Spinner/>}>
                <Outlet />
            </Suspense>
            <Footer/>
        </>
    )
}

export default Layout