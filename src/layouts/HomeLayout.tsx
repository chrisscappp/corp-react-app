import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStores } from "hooks/rootStoreContext"
import EnterForm from "components/EnterForm/EnterForm"
import RegModal from "components/RegModal/RegModal"
import Error from "components/Error/Error"
import Spinner from "components/Spinner/Spinner"
import Footer from "components/Footer/Footer"
import "./style.css"

const SCREEN_HEIGHT = window.screen.height

const HomeLayout = () => {

    const { 
        usersStore: { getUsersAction, addUser, users, isLoading: usersLoad, error: usersError }, 
        adminsStore: { getAdminsAction, addAdmin, admins, isLoading: adminsLoad, error: adminsError }, 
    } = useStores()

    const [showRegModal, setShowRegModal] = useState<boolean>(false)
    const handleShowRegModal = () => setShowRegModal(!showRegModal)

    useEffect(() => {
        getUsersAction()
        getAdminsAction()
    }, [])

    if (usersLoad && adminsLoad) return <Spinner/>
    if (usersError) return <Error message = {usersError}/>
    if (adminsError) return <Error message = {adminsError}/>

    return (
        <>
            <div className="home__wrapper" style={{ height: SCREEN_HEIGHT, marginTop: "25px" }}>
                <div className="home__wrapper-container">
                    <EnterForm 
                        users = {users}
                        admins = {admins}
                        showReg = {handleShowRegModal}
                    />
                </div>
            </div>
            <Footer/>
            {
                showRegModal ?
                    <RegModal
                        users = {users}
                        admins = {admins}
                        handleShow = {handleShowRegModal}
                        addUser = {addUser}
                        addAdmin = {addAdmin}
                    /> 
                    : null
            }
        </>
    )
}

export default observer(HomeLayout)