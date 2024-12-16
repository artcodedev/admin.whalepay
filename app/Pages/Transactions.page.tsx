
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
import { colors } from 'material-ui/styles';

interface Column {
    id: 'status' | 'sum' | 'domein' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'status', label: 'Статус', minWidth:  30 },

    { id: 'sum', label: 'Сумма', minWidth: 30 },

    {
        id: 'domein',
        label: 'Домен',
        minWidth: 30,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 30,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

function createData(
    name: string,
    code: string,
    population: number,
    size: number,
): Data {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const transactions_title = {

    fontSize: { xs: '20px', md: '30px', xl: '30px' },
    paddingTop: { xs: '10px', md: '20px', xl: '30px' },
    paddingBottom: { xs: '10px', md: '20px', xl: '30px' },
    color: '#575757'

}

const TransactionsPage = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const some = () => {
        console.log('some')
    }


    return (
        <>
            <Container sx={{ minWidth: { lg: '100%' } }}>
                <Wrapper>

                    <Typography variant="h5" noWrap component="div" sx={transactions_title}>
                        All transactions
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
                                                    sx={{textAlign: 'left',}}
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, textAlign: 'left'}}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>



                                        <TableBody>
                                            <TableRow hover role="checkbox" tabIndex={-1} onClick={some}>

                                                <TableCell sx={{textAlign: 'left', background: '#ff000087'}}>ERROR</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>2500</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>67895634</TableCell>
                                                <TableCell sx={{textAlign: 'left',}}>vulkan-roual.com</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>11.12.2024, 22:11:31</TableCell>

                                            </TableRow>

                                            <TableRow hover role="checkbox" tabIndex={-1} onClick={some}>

                                                <TableCell sx={{textAlign: 'left', background: '#5e5e5e87'}}>EXITED</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>2500</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>67895634</TableCell>
                                                <TableCell sx={{textAlign: 'left',}}>vulkan-roual.com</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>11.12.2024, 22:11:31</TableCell>

                                            </TableRow>

                                            <TableRow hover role="checkbox" tabIndex={-1} onClick={some}>

                                                <TableCell sx={{textAlign: 'left', background: '#07df00'}}>SUCSSES</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>2500</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>67895634</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>vulkan-roual.com</TableCell>
                                                <TableCell sx={{textAlign: 'left', }}>11.12.2024, 22:11:31</TableCell>

                                            </TableRow>
                                            
                                            {/* {rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.label}
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })} */}
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

                </Wrapper>
            </Container>
        </>
    );
}

export default TransactionsPage;