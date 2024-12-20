import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import Loading from "../Components/Loading";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import SnackbarAlert from "../Components/SnackbarAlert";

import * as style from '@/app/Styles/styles';
import { useAsyncEffect } from "use-async-effect";
import { Fetch } from "../Utils/Fetch";
import { useCookies } from 'react-cookie';
import { Answer } from "../Models/Answers/AnswerModels";

interface Column {
    label: string;
    minWidth?: number;
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

enum Currency {
    RUB,
    USD
}

interface Banks {
    id: number
    title: string
    status: boolean
    uid: string
    currency: Currency
    currencySymbol: string
}

interface ResponseBanks {
    status: number
    data?: Banks[]
    message?: string
}

const Banks = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useCookies(['token']);

    const [openError, setOpenError] = useState<boolean>(false);

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const [banks, setBanks] = useState<Banks[]>([]);

    const change = async (uid: string) => {

        // const cha: Answer = await Fetch.request('', {uid: uid, status: });
    }

    const changeStatusBanks = (status: boolean, uid: string) => () => {
        console.log(status);
        console.log(uid)
    }

    useAsyncEffect(async () => {

        const banks_response: ResponseBanks = await Fetch.request('http://localhost:3000/api/v1/get_banks', { token: token.token });

        if (banks_response.status == 200) {

            if (banks_response.data) {

                setBanks(banks_response.data);
                setLoading(false);

            } else { setOpenError(true); }
        }

        if (banks_response.status != 200) {
            setOpenError(true);
        }

    }, [])

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message="Ошибка получение данных!" />

            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}

            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

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

                                                        sx={i == 2 ? { textAlign: 'left', display: { xs: 'none', md: 'block' } } : { textAlign: 'left' }}
                                                        style={{ minWidth: column.minWidth, textAlign: 'left' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {banks.map((e) =>
                                                <TableRow hover role="checkbox" tabIndex={-1}>

                                                    <TableCell sx={{ textAlign: 'left' }}>{e.title}</TableCell>

                                                    <TableCell sx={{ textAlign: 'left', }}>{e.currency}</TableCell>

                                                    <TableCell sx={{ textAlign: 'left', display: { xs: 'none', md: 'table-cell' } }}>
                                                        {e.currencySymbol}
                                                    </TableCell>

                                                    <TableCell sx={{ textAlign: 'left', }}>
                                                        <Switch defaultChecked={e.status ? true : false} color="success" onChange={changeStatusBanks(e.status, e.uid)}/>
                                                    </TableCell>

                                                </TableRow>)}


                                            {/* <TableRow hover role="checkbox" tabIndex={-1}>

                                                <TableCell sx={{ textAlign: 'left' }}>SBER</TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>RUB</TableCell>

                                                <TableCell sx={{ textAlign: 'left', display: { xs: 'none', md: 'table-cell' } }}>
                                                    R
                                                </TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>
                                                    <Switch defaultChecked={false} />
                                                </TableCell>

                                            </TableRow> */}

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