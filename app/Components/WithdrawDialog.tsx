import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RefObject, useRef } from "react";


interface Props {
    open: boolean
    onClose: () => void
}

const WithdrawDialog = ({ ...pr }: Props) => {

    const descriptionElementRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    return (
        <>
            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper">

                <DialogTitle id="scroll-dialog-title">Создать вывод средств</DialogTitle>

                <DialogContent dividers={false}>

                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} sx={{ marginTop: '20px', marginBottom: '20px' }}></DialogContentText>
                    
                </DialogContent>
            </Dialog>


        </>
    );
}

export default WithdrawDialog;