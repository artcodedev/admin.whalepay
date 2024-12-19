
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { RefObject, useRef } from 'react';
import Chip from '@mui/material/Chip';

interface Props {
    open: boolean
    onClose: () => void
    onOk: () => void
}

const TransactionChancheStatusDialog = ({ ...pr }: Props) => {

    const descriptionElementRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    return (
        <>
            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper">

                <DialogTitle id="scroll-dialog-title">Изменить статус</DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} sx={{ marginTop: '20px', marginBottom: '20px' }}>

                        Вы хотите поменять статус на <Chip color='success' label='SUCCESS' /> ?

                    </DialogContentText>
                </DialogContent>

                <DialogActions>

                    <Button color='success' variant="contained" onClick={pr.onOk}>Да</Button>

                    <Button color='error' variant="contained" onClick={pr.onClose}>Отмена</Button>

                </DialogActions>

            </Dialog>
        </>
    );

}

export default TransactionChancheStatusDialog;