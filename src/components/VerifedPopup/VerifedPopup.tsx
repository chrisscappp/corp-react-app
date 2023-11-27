import { memo, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Popup from "../Popup/Popup"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import { findByKey } from "utils/findByKey"
import { useStores } from "hooks/rootStoreContext"
import { TEAM_ID } from "utils/localStorageKeys"

interface VerifedPopupProps {
	handleVerifedUser: (val: string) => void;
	handleShowVerifed: () => void;
    setShowErrorAlert: Dispatch<SetStateAction<boolean>>;
}

type VerifedPopupFormValues = {
	teamId: string;
}

const VerifedPopup = ({ handleVerifedUser, handleShowVerifed, setShowErrorAlert }: VerifedPopupProps) => {
	
	const { adminsStore: { admins, getAdminsAction } } = useStores()
	const { register, handleSubmit, formState: { errors } } = useForm<VerifedPopupFormValues>()

	const checkVerifed = (data: VerifedPopupFormValues) => {
		const fnd = findByKey(admins, "login", data.teamId)
		if (fnd) {
			handleVerifedUser(data.teamId)
			localStorage.setItem(TEAM_ID, data.teamId)
			window.location.reload()
		} else {
			setShowErrorAlert(true)
            handleShowVerifed()
            setTimeout(() => setShowErrorAlert(false), 5000)
		}
	}
	
	return (
		<>
			<Popup close = {handleShowVerifed}>
				<form onSubmit={handleSubmit(checkVerifed)}>
					<div style = {{display: "flex", justifyContent: "space-between"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            Подтвердите действие
                        </Typography>
                        <span className = "close__span">
                            <CloseIcon 
                                onClick = {handleShowVerifed}
                                fontSize='medium'
                            />
                        </span>
                    </div>
                    <Typography color="text.secondary">
                       	Введите id, выданный вашим Team Lead-ом...
                    </Typography>
                    <div className = "field-wrapper" style = {{marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="id..." 
                            variant="outlined" 
                            size="small" 
                            style={{width: "100%"}}
                            {...register("teamId", {
                                required: true,
                            })}
                        />
                        {errors.teamId && errors.teamId.type === "required" && (
                            <Typography className = "empty-error" style={{color: "red"}}>Поле не должно быть пустым</Typography>
                        )}
                    </div>
                    <button className = "change__button" type="submit" value="submit">
                        подтвердить действие
                    </button>
				</form>
			</Popup>
		</>
	)
}

export default memo(VerifedPopup)