import { memo, Dispatch, SetStateAction } from "react"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import "./style.css"

interface WrongPasswordProps {
    setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const WrongPassword = ({setShowPopup}: WrongPasswordProps) => {

    const handleShowPopup = () => setShowPopup((showPopup) => !showPopup)

    return (
        <>
            <Popup close = {handleShowPopup}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Упс...
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: "18px" }}>
                    Неправильный логин или пароль
                </Typography>
                <div className = "popup__button-wrapper">
                    <button className = "popup__button-wrapper__admit" onClick = {handleShowPopup}>
                        понятно
                    </button>
                </div>
            </Popup>
        </>
    )
}

export default memo(WrongPassword)