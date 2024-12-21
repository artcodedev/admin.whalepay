
import Container from '@mui/material/Container';
import Wrapper from '../Components/Wrapper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import TransactionDataDialog from '../Components/TransactionsDataDialog';
import TransactionChancheStatusDialog from '../Components/TransactionChangeStatusDialog';

import * as style from '@/app/Styles/styles';
import { useState } from 'react';
import { Column, Data, RequestDataTransactions } from '../Models/Transactions';
import Chip from '@mui/material/Chip';



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
        id: 'id_client',
        label: 'ID Клиента',
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


const createData = (name: string, code: string, population: number, size: number): Data => {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows: RequestDataTransactions[] = [
    {
        status: 'REQVER',
        sum: 2500,
        domein: 'some.com.ru',
        id_client: '1121212',
        time: '12.10.11',
        number_card: 21821387158,
        login: 'pisunlogin',
        password: 'pinunpass',
        uid: '1111111'

    },
    {
        status: 'SUCCESS',
        sum: 2500,
        domein: 'some.com.ru',
        id_client: '1121212',
        time: '12.10.11',
        number_card: 21821387158,
        login: 'pisunlogin',
        password: 'pinunpass',
        uid: '2222222'

    },

]

const TransactionsPage = () => {

    const [openDataTransaction, setOpenDataTransaction] = useState<boolean>(false);
    const [requestDataTransactions, setRequestDataTransactions] = useState<RequestDataTransactions | null>(null);

    const [openTransactionChancheStatusDialog, setTransactionChancheStatusDialog] = useState<boolean>(false);
    const [uidChange, setUidChanche] = useState<string | null>(null);

    const sx_style = { textAlign: 'left', display: { xs: 'none', md: 'table-cell' } };
    const sx_st_left = { textAlign: 'left' };

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
        console.log(uidChange);
        setTransactionChancheStatusDialog(false);
    }

    const changeStatus = (e: string, uid: string) => () => {

        if (e !== 'SUCCESS') {
            setUidChanche(uid);
            setTransactionChancheStatusDialog(true);
        }

    }


    return (
        <>
            <TransactionChancheStatusDialog onClose={handleCloseTransactionChancheStatusDialog} open={openTransactionChancheStatusDialog} onOk={changeStatusRequest}/>

            <TransactionDataDialog onClose={handleCloseDataTransaction} open={openDataTransaction} transactions={requestDataTransactions} />

            <Container sx={{ minWidth: { lg: '100%' } }}>
                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Транзакции
                        </Typography>

                        <Wrapper>

                            <Box sx={{ minWidth: { lg: '100%' }, border: '1px solid #eee' }}>

                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 740 }}>
                                        <Table stickyHeader aria-label="sticky table">

                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column, i) => (
                                                        <TableCell
                                                            sx={[2, 3, 4].includes(i) ? sx_style : sx_st_left}
                                                            key={column.id}
                                                            style={{ minWidth: column.minWidth, textAlign: 'left' }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>

                                                {rows.map((e) =>
                                                    <TableRow hover role="checkbox" tabIndex={-1} >

                                                        <TableCell sx={sx_st_left}>

                                                            <Chip

                                                                onClick={changeStatus(e.status, e.uid)}

                                                                clickable
                                                                label={e.status}

                                                                color={

                                                                    e.status === 'ERROR' ? 'error' :
                                                                        e.status === 'REQVER' ? 'secondary' :
                                                                            e.status === 'TIMEEND' ? 'info' :
                                                                                e.status === 'SUCCESS' ? 'success' :
                                                                                    e.status === 'PENDING' ? 'warning' : 'error'

                                                                }

                                                            />

                                                        </TableCell>

                                                        <TableCell sx={sx_st_left}>{e.sum}</TableCell>

                                                        <TableCell sx={sx_style}>{e.domein}</TableCell>

                                                        <TableCell sx={sx_style}>{e.id_client}</TableCell>

                                                        <TableCell sx={sx_style}>{e.time}</TableCell>

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

                            </Box>

                        </Wrapper>
                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default TransactionsPage;