import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Switch from "@mui/material/Switch";
import Loading from "../Components/Loading";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import * as style from '@/app/Styles/styles';
import DataCards from "../Components/DataCards";
import { Fetch } from "../Utils/Fetch";
import { useCookies } from 'react-cookie';
import SnackbarAlert from "../Components/SnackbarAlert";
import { useAsyncEffect } from "use-async-effect";
import { Answer } from "../Models/Answers/AnswerModels";
import { Cards, Column, ResponseCards } from "../Models/CardsPageModel";


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
        label: 'Активна',
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

    const [openDataCards, setOpenDataCards] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useCookies(['token']);
    const [openError, setOpenError] = useState<boolean>(false);
    const [cards, setCards] = useState<Cards[]>([]);
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const formatNumber = (num: string): string => {
        const regex = /^(\w{0,4})(\w{0,4})(\w{0,4})(\w{0,4})$/g
        const words = num.replace(/[^\w]/g, '')

        return words.replace(regex, (regex, a, b, c, d) =>
            [a, b, c, d].filter(group => !!group).join(' ')
        )
    }

    const handleCloseDataCards = () => {
        setOpenDataCards(false);
    };

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const setDataCards = (login: string, pass: string) => (): void => {
        setLogin(login);
        setPass(pass);
        setOpenDataCards(true);
    }

    const getDataCards = async () => {

        const cards_response: ResponseCards = await Fetch.request('http://localhost:3000/api/v1/get_cards', { token: token.token });

        if (cards_response.status == 200) {

            if (cards_response.data) {

                setCards(cards_response.data);
                setLoading(false);

            } else { setOpenError(true); }
        }

        if (cards_response.status != 200) {
            setOpenError(true);
        }

    }

    const updateStatusBusyCard = async (login: string, status: boolean, busy: boolean) => {

        const cha: Answer = await Fetch.request('http://localhost:3000/api/v1/update_card', { token: token.token, login: login, status: status, busy: busy });

        if (cha.status == 200) { await getDataCards(); }

        if (cha.status != 200) { setOpenError(true); }

    }

    const changeStatusBusyCard = (login: string, status: boolean, busy: boolean) => () => {

        updateStatusBusyCard(login, status, busy);

    }

    useAsyncEffect(async () => {

        await getDataCards();

    }, [])

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message="Ошибка получение данных!" />

            <DataCards onClose={handleCloseDataCards} open={openDataCards} login={login} pass={pass} />

            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>

                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Банковские карты
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
                                                        style={{ minWidth: column.minWidth, textAlign: 'left' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {cards.map((e) => <TableRow hover role="checkbox" tabIndex={-1}>

                                                <TableCell sx={{ textAlign: 'left' }}>{formatNumber(e.card_number)}</TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>{e.balance}</TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>
                                                    <Switch
                                                        defaultChecked={e.active ? true : false}
                                                        onChange={changeStatusBusyCard(e.card_login, e.active == true ? false : true, e.busy)}
                                                    />
                                                </TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>
                                                    <Switch
                                                        defaultChecked={e.busy ? true : false}
                                                        onChange={changeStatusBusyCard(e.card_login, e.active, e.busy == true ? false : true)}
                                                    />
                                                </TableCell>

                                                <TableCell sx={{ textAlign: 'left', }}>

                                                    <IconButton>

                                                        <InfoIcon color={'info'} onClick={setDataCards(e.card_login, e.card_password)} />

                                                    </IconButton>

                                                </TableCell>

                                            </TableRow>

                                            )}

                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </Box>}

                        </Wrapper>

                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default CardsPage;