import { memo } from "react"
import Typography from "@mui/material/Typography"

interface ErrorProps {
    message: string;
}

const Error = ({ message }: ErrorProps) => {
    return (
        <>
            <Typography>
                {message}
            </Typography>
        </>
    )
}

export default memo(Error)