import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { RefObject, useRef } from 'react';
import { RequestDataTransactions } from '../Models/Transactions';
import BoxDataTransactions from '@/app/Components/BoxDataTransaction';


interface Props {
    open: boolean
    onClose: () => void
    transactions: RequestDataTransactions | null
}

const TransactionDataDialog = ({ ...pr }: Props) => {   

    const descriptionElementRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    const sx_tr = {
        display: {
            xs: 'block',
            md: 'none'
        }
    }

    return (
        <>

            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper">

                <DialogTitle id="scroll-dialog-title">Данные транзакции</DialogTitle>

                <DialogContent dividers={false}>

                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} sx={{ marginTop: '20px', marginBottom: '20px' }}>

                        <Box sx={sx_tr}>
                            <BoxDataTransactions type="Домен" data={pr.transactions?.domein} />
                        </Box>
                        <Box sx={sx_tr}>
                            <BoxDataTransactions type="UID Сессии" data={pr.transactions?.uid_session} />
                        </Box>

                        <Box sx={sx_tr}>
                            <BoxDataTransactions type="Время" data={  pr.transactions?.time ? new Date(Number(pr.transactions.time)).toLocaleString('ru-RU', { hour12: false }) : undefined  } />
                        </Box>

                        <BoxDataTransactions type="Номер карты" data={pr.transactions?.number_card.toString() || 'не назначено.'} />

                        <BoxDataTransactions type="Логин" data={pr.transactions?.login || 'не назначено.' } />

                        <BoxDataTransactions type="Пароль" data={pr.transactions?.password || 'не назначено.'} />

                    </DialogContentText>
                    
                </DialogContent>

                <DialogActions>
                    <Button onClick={pr.onClose}>Закрыть</Button>
                </DialogActions>

            </Dialog>

        </>
    );

}

export default TransactionDataDialog;
