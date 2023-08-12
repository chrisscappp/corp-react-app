import { memo, Dispatch, SetStateAction } from "react"
import Typography from "@mui/material/Typography"

interface ProfileNewTaskProps {
    setShowNewTaskPopup: Dispatch<SetStateAction<boolean>>;
}

const ProfileNewTask = ({ setShowNewTaskPopup }: ProfileNewTaskProps) => {

    const handleShowPopup = () => setShowNewTaskPopup((showPopup) => !showPopup)

    return (
        <>
            <div className = "adminProfile__wrapper-fooldev__wrapper common-profile__wrapper">
                <div className = "info-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Новая таска
                    </Typography>
                </div>
                <div className = "info-wrapper__body" style = {{paddingLeft: "15px", paddingTop: "5px", paddingBottom: "15px"}}>
                    <button 
                        className = "info-wrapper__body-buttons__item item1" 
                        style = {{marginTop: "5px", width: "330px"}}
                        onClick = {handleShowPopup}
                    >
                        взмахнуть жезлом боли и тирании
                    </button>
                </div>
            </div>
        </>
    )
}

export default memo(ProfileNewTask)