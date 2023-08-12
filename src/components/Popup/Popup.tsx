import { memo, ReactNode } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { style } from "../RegModal/style"

interface PopupProps {
    close: () => void;
    children: ReactNode
}

const Popup = ({ close, children }: PopupProps) => {

    return (
        <>
            <Modal
                open={true}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </>
    )
}

export default memo(Popup)