
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
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import TransactionDataDialog from './TransactionsDataDialog';

import * as style from '@/app/Styles/styles';
import { useState } from 'react';
import { Column, Data, RequestDataTransactions } from '../Models/Transactions';



const columns: readonly Column[] = [
    { id: 'status', label: 'Статус', minWidth: 30 },

    { id: 'sum', label: 'Сумма', minWidth: 30 },

    {
        id: 'domein',
        label: 'Домен',
        minWidth: 50,
    },
    {
        id: 'id_client',
        label: 'ID Клиента',
        minWidth: 50,
    },
    {
        id: 'time',
        label: 'Время',
        minWidth: 50,
    },
    {
        id: 'data',
        label: 'Данные',
        minWidth: 50
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
        uid: ''

    },
    {
        status: 'ERROR',
        sum: 2500,
        domein: 'some.com.ru',
        id_client: '1121212',
        time: '12.10.11',
        number_card: 21821387158,
        login: 'pisunlogin',
        password: 'pinunpass',
        uid: ''

    }
]

const TransactionsPage = () => {

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [openDataTransaction, setOpenDataTransaction] = useState<boolean>(false);
    const [requestDataTransactions, setRequestDataTransactions] = useState<RequestDataTransactions | null>(null)

    const handleCloseDataTransaction = () => {
        setOpenDataTransaction(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showData = (d: RequestDataTransactions) => () => {
        console.log(d)
        setRequestDataTransactions(d);
        setOpenDataTransaction(true);
    }


    return (
        <>

        <TransactionDataDialog onClose={handleCloseDataTransaction} open={openDataTransaction} transactions={requestDataTransactions}/>

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
                                                            sx={ [2, 3, 4].includes(i) ? { textAlign: 'left', display: {xs: 'none', md: 'table-cell'}} : { textAlign: 'left'}}
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

                                                        <TableCell sx={{ textAlign: 'left', background: '#ff000087' }}>{e.status}</TableCell>
                                                        <TableCell sx={{ textAlign: 'left', }}>{e.sum}</TableCell>
                                                        <TableCell sx={{ textAlign: 'left', display: {xs: 'none', md: 'table-cell'}} }>{e.domein}</TableCell>
                                                        <TableCell sx={{ textAlign: 'left', display: {xs: 'none', md: 'table-cell'}}}>{e.id_client}</TableCell>
                                                        <TableCell sx={{ textAlign: 'left', display: {xs: 'none', md: 'table-cell'}}}>{e.time}</TableCell>

                                                        <TableCell sx={{ textAlign: 'left', }}>
                                                            <IconButton >

                                                                <InfoIcon color={'info'} onClick={showData(e)}/>

                                                            </IconButton>
                                                        </TableCell>

                                                    </TableRow>)}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>


                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
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