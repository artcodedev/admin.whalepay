import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Loading from "../Components/Loading";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import SnackbarAlert from "../Components/SnackbarAlert";

import * as style from '@/app/Styles/styles';


interface Column {
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        label: 'Название',
        minWidth: 30
    },

    {
        label: 'Валюта',
        minWidth: 30
    },

    {
        label: 'Символ валюты',
        minWidth: 30,
    },
    {
        label: 'Статус',
        minWidth: 30,
    },

];

const Banks = () => {

    const [loading, setLoading] = useState<boolean>(false);


    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (e: boolean) => (): void => { setOpen(e); };

    const handleClick = (): void => { setOpen(true); };



  
    return (
        <>

        <SnackbarAlert open={open} duration={4000} handleClose={handleClose}/>

            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

                <Button onClick={handleClick}>Open Snackbar</Button>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Все банки
                        </Typography>

                        <Wrapper>

                            {loading ? <Loading /> : <Box sx={{ minWidth: { lg: '100%' }, border: '1px solid #eee' }}>


                                <TableContainer sx={{ maxHeight: 740 }}>
                                    <Table stickyHeader aria-label="sticky table">


                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column, i) => (
                                                    <TableCell
                                                        
                                                        sx={i == 2 ? { textAlign: 'left', display: {xs: 'none', md: 'block'}} : { textAlign: 'left'} }
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, textAlign: 'left' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>


                                            <TableRow hover role="checkbox" tabIndex={-1}>

                                                <TableCell sx={{ textAlign: 'left' }}>SBER</TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>RUB</TableCell>

                                                <TableCell sx={{ textAlign: 'left', display: {xs: 'none', md: 'table-cell'}}}>
                                                    R
                                                </TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>
                                                    <Switch defaultChecked={false} />
                                                </TableCell>

                                            </TableRow>

                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Box>


                            }



                        </Wrapper>

                    </Box>


                </Wrapper>
            </Container>


            


           
        </>
    );
}

export default Banks;