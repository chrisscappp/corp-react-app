import { memo, Dispatch, SetStateAction } from "react"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import "./style.css"

interface WrongModalProps {
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    title: string;
}

const WrongModal = ({setShowPopup, title}: WrongModalProps) => {

    const handleShowPopup = () => setShowPopup((showPopup) => !showPopup)

    return (
        <>
            <Popup close = {handleShowPopup}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Упс...
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: "18px" }}>
                    {title}
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

export default memo(WrongModal)