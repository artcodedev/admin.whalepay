import Container from "@mui/material/Container";
import Wrapper from "./Components/Wrapper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Switch from "@mui/material/Switch";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import Loading from "./Components/Loading";
import { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import DataCards from "./Components/DataCards";

const transactions_title = {

    fontSize: { xs: '20px', md: '30px', xl: '30px' },
    paddingTop: { xs: '10px', md: '20px', xl: '30px' },
    paddingBottom: { xs: '10px', md: '20px', xl: '30px' },
    color: '#575757'

}

interface Column {
    // id: 'number_card' | 'sum' | 'domein' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        label: 'Номер ',
        minWidth: 30
    },

    {
        label: 'Баланс',
        minWidth: 30
    },

    {
        label: 'Актина',
        minWidth: 30,
    },
    {
        label: 'Занята',
        minWidth: 30,
    },
    {
        label: 'Подробнее',
        minWidth: 30
    }
];


const CardsPage = () => {


    const [openDataCards, setOpenDataCards] = useState(false);

    const handleClickOpen = () => {
        setOpenDataCards(true);
    };

    const handleCloseDataCards = () => {
        setOpenDataCards(false);
    };

    const [loading, setLoading] = useState<boolean>(false);

    const some = (st: string) => (): void => {

        console.log("some")
    }

    return (
        <>

            <DataCards onClose={handleCloseDataCards} open={openDataCards} />

            <Container sx={{ minWidth: { lg: '100%' } }}>
                <Wrapper>

                    <Typography variant="h5" noWrap component="div" sx={transactions_title}>
                        All Cards
                    </Typography>

                    <Wrapper>

                        {loading ? <Loading /> : <Box sx={{ minWidth: { lg: '100%' }, border: '1px solid #eee' }}>


                            <TableContainer sx={{ maxHeight: 740 }}>
                                <Table stickyHeader aria-label="sticky table">


                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column, i) => (
                                                <TableCell
                                                    sx={{ textAlign: 'left', }}
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

                                            <TableCell sx={{ textAlign: 'left' }}>0000 0000 0000 0000</TableCell>

                                            <TableCell sx={{ textAlign: 'left', }}>2500</TableCell>

                                            <TableCell sx={{ textAlign: 'left', }}> <Switch defaultChecked={false} /></TableCell>

                                            <TableCell sx={{ textAlign: 'left', }}>
                                                <Switch defaultChecked={false} />
                                            </TableCell>

                                            <TableCell sx={{ textAlign: 'left', }}>

                                                <IconButton onClick={handleClickOpen}>

                                                    <InfoIcon color={'info'} onClick={some('000000000')} />
                                                </IconButton>

                                            </TableCell>

                                        </TableRow>

                                    </TableBody>

                                </Table>
                            </TableContainer>

                        </Box>}



                    </Wrapper>

                </Wrapper>
            </Container>
        </>
    );
}

export default CardsPage;