import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStores } from "../hooks/rootStoreContext"
import { isAxiosError } from "../utils/typeGuards"
import EnterForm from "../components/EnterForm/EnterForm"
import RegModal from "../components/RegModal/RegModal"
import Error from "../components/Error/Error"
import Spinner from "../components/Spinner/Spinner"
import { IAdmin } from "../models"
import "./style.css"

const SCREEN_HEIGHT = window.screen.height

const HomeLayout = () => {

    const { 
        usersStore: { getUsersAction, users }, 
        adminsStore: { getAdminsAction, admins }, 
    } = useStores()

    const [showRegModal, setShowRegModal] = useState<boolean>(false)
    const handleShowRegModal = () => setShowRegModal(!showRegModal)

    useEffect(() => {
        getUsersAction()
        getAdminsAction()
    }, [])

    return users?.case({
        pending: () => <Spinner/>,
        rejected: () => <Error message = {isAxiosError(users.value) ? users.value.message : "Error"}/>,
        fulfilled: (value) => {
            return <>
                <div className="home__wrapper" style={{ height: SCREEN_HEIGHT, marginTop: "25px" }}>
                    <div className="home__wrapper-container">
                        <EnterForm 
                            users = {value}
                            admins = {admins.value as IAdmin[]}
                            showReg = {handleShowRegModal}
                        />
                    </div>
                </div>
                <div className="footer"></div>
                {
                    showRegModal ?
                        <RegModal
                            users = {value}
                            admins = {admins.value as IAdmin[]}
                            handleShow = {handleShowRegModal}
                        /> 
                        : null
                }
            </>
        }, 
    })
}

export default observer(HomeLayout)