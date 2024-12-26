

'use client'

import Container from '@mui/material/Container';
import Wrapper from '../Components/Wrapper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useCookies } from 'react-cookie';
import TransactionDataDialog from '../Components/TransactionsDataDialog';
import TransactionChancheStatusDialog from '../Components/TransactionChangeStatusDialog';
import * as style from '@/app/Styles/styles';
import { useState } from 'react';
import { Column, RequestDataTransactions, ResponseTransactions } from '../Models/Transactions';
import Chip from '@mui/material/Chip';
import { Fetch } from '../Utils/Fetch';
import SnackbarAlert from '../Components/SnackbarAlert';
import Loading from '../Components/Loading';



const columns: readonly Column[] = [
    { id: 'status', label: 'Статус', minWidth: 30, maxWidth: 100 },

    { id: 'sum', label: 'Сумма', minWidth: 30, maxWidth: 100 },

    {
        id: 'domein',
        label: 'Домен',
        minWidth: 50,
        maxWidth: 100
    },
    {
        id: 'uid_session',
        label: 'UID Сессии',
        minWidth: 50,
        maxWidth: 100
    },
    {
        id: 'time',
        label: 'Время',
        minWidth: 50,
        maxWidth: 100
    },
    {
        id: 'data',
        label: 'Данные',
        minWidth: 50,
        maxWidth: 100
    },
];


const TransactionsPage = () => {

    const [token,] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDataTransaction, setOpenDataTransaction] = useState<boolean>(false);
    const [requestDataTransactions, setRequestDataTransactions] = useState<RequestDataTransactions | null>(null);

    const [openTransactionChancheStatusDialog, setTransactionChancheStatusDialog] = useState<boolean>(false);
    const [uidChange, setUidChanche] = useState<string>('');

    const [transactions, setTransactions] = useState<RequestDataTransactions[]>([]);
    const [openError, setOpenError] = useState<boolean>(false);

    const sx_style = { textAlign: 'left', display: { xs: 'none', md: 'table-cell' } };
    const sx_st_left = { textAlign: 'left' };

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const handleCloseTransactionChancheStatusDialog = (): void => {
        setTransactionChancheStatusDialog(false);
    };

    const handleCloseDataTransaction = (): void => {
        setOpenDataTransaction(false);
    };

    const showData = (d: RequestDataTransactions) => (): void => {
        setRequestDataTransactions(d);
        setOpenDataTransaction(true);
    }

    const changeStatusRequest = () => {

        setTransactionChancheStatusDialog(false);

        updateStatus(uidChange)
    }

    const updateStatus = async (uid: string) => {

        const update_transacrtions: ResponseTransactions = await Fetch.request('http://localhost:3000/api/v1/update_transaction', { token: token.token, uid: uid });

        if (update_transacrtions.status != 200) {
            setOpenError(true);
        }
    }

    const changeStatus = (e: string, uid: string) => () => {

        if (e !== 'SUCCESS') {
            setUidChanche(uid);
            setTransactionChancheStatusDialog(true);
        }
    }

    const getDataTransactions = async () => {

        const transacrtions_response: ResponseTransactions = await Fetch.request('http://localhost:3000/api/v1/get_transactions', { token: token.token });

        if (transacrtions_response.status == 200) {

            if (transacrtions_response.data) {

                setTransactions(transacrtions_response.data);
                setLoading(false);

            } else { setOpenError(true); }
        }

        if (transacrtions_response.status != 200) {
            setOpenError(true);
        }

    }

    useEffect(() => {

        getDataTransactions();

        let timer_id = setInterval(() => {

            getDataTransactions();

        }, 3000);

        return () => clearInterval(timer_id);

    }, []);

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message="Ошибка получение данных!" />

            <TransactionChancheStatusDialog onClose={handleCloseTransactionChancheStatusDialog} open={openTransactionChancheStatusDialog} onOk={changeStatusRequest} />

            <TransactionDataDialog onClose={handleCloseDataTransaction} open={openDataTransaction} transactions={requestDataTransactions} />

            <Container sx={{ minWidth: { lg: '100%' } }}>
                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Транзакции
                        </Typography>

                        <Wrapper>

                            {loading ? <Loading /> : <Box sx={{ minWidth: { lg: '100%' }, border: '1px solid #eee' }}>

                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 740 }}>
                                        <Table stickyHeader aria-label="sticky table">

                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column, i) => (
                                                        <TableCell
                                                            sx={[2, 3, 4].includes(i) ? sx_style : sx_st_left}
                                                            key={column.id}
                                                            style={{ minWidth: column.minWidth, textAlign: 'left', fontWeight: 'bold' }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>

                                                {transactions.map((e) =>
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={''}>

                                                        <TableCell sx={sx_st_left} key={''}>

                                                            <Chip

                                                                onClick={changeStatus(e.status, e.uid_session)}

                                                                clickable
                                                                label={e.status}

                                                                color={

                                                                    e.status === 'REQVER' ? 'secondary' :
                                                                        e.status === 'EXITED' ? 'info' :
                                                                            e.status === 'SUCCESS' ? 'success' :
                                                                                e.status === 'PROCESS' ? 'warning' :
                                                                                    e.status === 'PENDING_PAY' ? 'warning' :
                                                                                        e.status === 'PENDING_CARD' ? 'warning' :
                                                                                            e.status === 'PENDING_TRX' ? 'warning' : 'error'
                                                                }

                                                            />

                                                        </TableCell>

                                                        <TableCell sx={sx_st_left}>{e.sum}</TableCell>

                                                        <TableCell sx={sx_style}>{e.domein}</TableCell>

                                                        <TableCell sx={sx_style}>{e.uid_session}</TableCell>

                                                        <TableCell sx={sx_style}>{new Date(Number(e.time)).toLocaleString('ru-RU', { hour12: false })}</TableCell>

                                                        <TableCell sx={sx_st_left}>
                                                            <IconButton >

                                                                <InfoIcon color={'info'} onClick={showData(e)} />

                                                            </IconButton>
                                                        </TableCell>

                                                    </TableRow>
                                                )}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>

                            </Box>}

                        </Wrapper>
                    </Box>

                </Wrapper>
            </Container>


        </>
    );
}

export default TransactionsPage;