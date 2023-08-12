import { memo } from "react"
import Alert from "@mui/material/Alert"

interface AlertComponentProps {
    successTitle: string;
    showSuccess: boolean;
    showError: boolean;
}

const AlertComponent = ({ successTitle, showSuccess, showError }: AlertComponentProps) => {
    return (
        <>
            {
                showSuccess ? 
                    <Alert 
                        severity="info" 
                        style = {{ height: "38px", position: "absolute", zIndex: 9999, boxShadow: "0px 1px 3px black"}}
                    >
                        {successTitle}
                    </Alert> : showError ?
                        <Alert 
                            severity="error" 
                            style = {{ height: "38px", position: "absolute", zIndex: 9999, boxShadow: "0px 1px 3px black"}}
                        >
                            Отказано в действии...
                        </Alert>
                        : null
            }
        </>
    )
}

export default memo(AlertComponent)