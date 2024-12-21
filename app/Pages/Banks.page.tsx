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
import SnackbarAlert from "../Components/SnackbarAlert";
import * as style from '@/app/Styles/styles';
import { useAsyncEffect } from "use-async-effect";
import { Fetch } from "../Utils/Fetch";
import { useCookies } from 'react-cookie';
import { Answer } from "../Models/Answers/AnswerModels";
import { ResponseBanks, BanksM, Column } from "../Models/BanksPageModel";


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

    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useCookies(['token']);

    const [openError, setOpenError] = useState<boolean>(false);

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const [banks, setBanks] = useState<BanksM[]>([]);

    const getDataBanks = async () => {

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
    }

    const updateStatusBank = async (uid: string, status: boolean) => {

        const cha: Answer = await Fetch.request('http://localhost:3000/api/v1/update_banks', { token: token.token, uid: uid, status: status });

        if (cha.status == 200) { await getDataBanks(); }

        if (cha.status != 200) { setOpenError(true); }
    }

    const changeStatusBanks = (status: boolean, uid: string) => () => { updateStatusBank(uid, status); }

    useAsyncEffect(async () => {

        await getDataBanks();

    }, [])

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message="Ошибка получение данных!" />

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
                                                        style={{ minWidth: column.minWidth, textAlign: 'left', fontWeight: 'bold' }}
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
                                                        <Switch defaultChecked={e.status ? true : false} color="success" onChange={changeStatusBanks(e.status, e.uid)} />
                                                    </TableCell>

                                                </TableRow>)}

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