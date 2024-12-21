import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from './Loading';
import { useRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import BoxDataTransactions from './BoxDataTransaction';

interface Props {
    open: boolean
    login: string
    pass: string
    onClose: () => void
}

export interface SnackbarMessage {
    message: string;
    key: number;
}

const DataCards = ({ ...pr }: Props) => {

    const descriptionElementRef = useRef<HTMLElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [typeSnackbar, setTypeSnackbar] = useState<string>('');
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

    const handleClose = () => { setSnackbar(false); }

    const handleExited = () => { setMessageInfo(undefined); };

    return (
        <>

            <Snackbar
                open={snackbar}
                autoHideDuration={500}
                TransitionProps={{ onExited: handleExited }}
                onClose={handleClose}
                message={typeSnackbar}
            />

            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper">

                <DialogTitle id="scroll-dialog-title">Данные карты</DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} sx={{ marginTop: '20px', marginBottom: '20px' }}>

                        {loading ? <Loading /> : <>

                            <BoxDataTransactions type="Логин" data={pr.login} />

                            <BoxDataTransactions type="Пароль" data={pr.pass} />

                        </>
                        }

                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={pr.onClose}>Закрыть</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default DataCards;   