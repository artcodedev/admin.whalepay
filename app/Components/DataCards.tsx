import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from './Loading';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

interface Props {
    open: boolean
    onClose: () => void
}

export interface SnackbarMessage {
    message: string;
    key: number;
}

const contentCopyIcon = { fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }

const DataCards = ({ ...pr }: Props) => {

    const descriptionElementRef = useRef<HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [typeSnackbar, setTypeSnackbar] = useState<string>('');
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

    const handleClose = () => { setSnackbar(false); }

    const copyData = (st: string, data: string) => () => {
        setTypeSnackbar(st);
        setSnackbar(true);
        navigator.clipboard.writeText(data)
    }

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

                            <Box>

                                Логин:&nbsp;
                                <span style={{ color: '#000' }}>loagin_login</span>

                                <ContentCopyIcon onClick={copyData('login copy', 'som txet')} sx={contentCopyIcon} />

                            </Box>

                            <Box>

                                Пароль:&nbsp;
                                <span style={{ color: '#000', textDecoration: 'underline' }}>20923n785&*^RFo2378</span>
                                <ContentCopyIcon onClick={copyData('login copy', 'som txet')} sx={contentCopyIcon} />

                            </Box>

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