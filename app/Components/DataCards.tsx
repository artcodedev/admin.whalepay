import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from './Loading';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
// import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface Props {
    open: boolean
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
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
        undefined,
      );

      const handleClose = () => {
        setSnackbar(false)
      }

    const copyData = (st: string, data: string) => () => {
        setTypeSnackbar(st);
        setSnackbar(true);
        navigator.clipboard.writeText(data)
    }

    const handleExited = () => {
        setMessageInfo(undefined);
      };

      const { enqueueSnackbar } = useSnackbar();

      const handleClick = () => {
        enqueueSnackbar('I love snacks.');
      };
    
      const handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
      };
    

    return (
        <>


            <Snackbar
                open={snackbar}
                autoHideDuration={1000}
                TransitionProps={{ onExited: handleExited }}
                onClose={handleClose}

                message={typeSnackbar}
                
            />
            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper">

                <DialogTitle id="scroll-dialog-title">Данные карты</DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText ref={descriptionElementRef} tabIndex={-1}>

                        {loading ? <Loading /> : <>

                            <Box>Login: <span style={{ color: '#000' }}>loagin_login</span><Button onClick={handleClickVariant('success')}>Show success snackbar</Button><ContentCopyIcon onClick={copyData('login copy', 'som txet')} sx={{ fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }} /></Box>

                            <Box>Password: <span style={{ color: '#000', textDecoration: 'underline' }}>20923n785&*^RFo2378</span> <ContentCopyIcon onClick={copyData('login copy', 'som txet')} sx={{ fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }} /></Box></>}
                        <Loading />
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