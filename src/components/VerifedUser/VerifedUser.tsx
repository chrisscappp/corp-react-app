import Typography from "@mui/material/Typography"
import "./style.css"

interface VerifedUserProps {
	handleShowVerifed: () => void;
}

const VerifedUser = ({ handleShowVerifed }: VerifedUserProps) => {

	return (
		<>
			<div className = "userProfile__wrapper-verifed__account__wrapper common-profile__wrapper">
                <div className = "verifed-wrapper__header">
                    <Typography gutterBottom variant="h5" component="div" style = {{paddingTop: "15px", paddingLeft: "15px"}}>
                        Подтвердить аккаунт
                    </Typography>
                </div>
                <div className = "verifed-wrapper__body">
                    <button 
						className = "item3" 
						onClick = {handleShowVerifed}
					>
                        завершить регистрацию
                    </button>
                </div>
            </div>
		</>
	)
}

export default VerifedUser