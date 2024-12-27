import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../Components/Loading";
import { ChangeEvent, useEffect, useState } from "react";
import * as style from '@/app/Styles/styles';
import ToggleButton from "@mui/material/ToggleButton";
import AddIcon from '@mui/icons-material/Add';
import { Column } from "../Models/BanksPageModel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import WithdrawDialog from "../Components/WithdrawDialog";
import { Fetch } from "../Utils/Fetch";
import { useCookies } from "react-cookie";
import SnackbarAlert from "../Components/SnackbarAlert";
import { SelectChangeEvent } from "@mui/material/Select";


const columns: readonly Column[] = [
    {
        label: 'Статус',
        minWidth: 30
    },

    {
        label: 'Карта',
        minWidth: 30
    },

    {
        label: 'Сумма',
        minWidth: 30,
    },
    {
        label: 'Время',
        minWidth: 30,
    }

];

enum WithdrawStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}


interface DataWithdraw {
    withdraw_card_number: string
    amount: number
    status: WithdrawStatus
    created_at: number
}

interface CardData {
    card_number: string
    balance: number
}
interface CardDataFetch {
    status: number
    data: CardData[]
}

interface GetAllWithDraw {
    status: number
    data: DataWithdraw[]
}

interface createWithDraw {
    token: string
    card_number: string
    amount: number
}

const Withdraw = () => {

    const [token,] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataWithdraw, setDataWithdraw] = useState<DataWithdraw[]>([]);
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<boolean>(true);

    const [changeCardNumber, setChangeCardNumber] = useState<string>('');

    const [cards, setCards] = useState<CardData[]>([]);

    const [messageError, setMessageError] = useState<string>('')
    const [openError, setOpenError] = useState<boolean>(false);

    const [openDataWithdrawDialog, setOpenDataWithdrawDialog] = useState<boolean>(false);

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const closeDataWithdrawDialog = () => {
        setOpenDataWithdrawDialog(false)
    }


    const createWithDraw = async () => {

        const data: createWithDraw = {
            token: token.token,
            card_number: changeCardNumber,
            amount: amount
        }
        const withdraw: {status: number} = await Fetch.request('http://localhost:3000/api/v1/createwithdraw', data);

        if (withdraw.status == 200) {getAllWithDraw();}

        if (withdraw.status == 400) {
            setLoading(false);
            setOpenError(true);
            setMessageError("Не достаточно средств!");
        }

        if (withdraw.status != 200 && withdraw.status != 400) {
            setLoading(false);
            setOpenError(true);
            setMessageError("Ошибка создания выплаты!");
        }
    } 

    const onOkWithdraw = () => {

        setOpenDataWithdrawDialog(false)
        setLoading(true);

        if (amount == 0) {
            setMessageError("Сумма должна быть больше нуля!");
            setOpenError(true);
            setLoading(false);
        }
        if (changeCardNumber.length == 0) {
            setMessageError("Карта не выбрана!");
            setOpenError(true);
            setLoading(false);
        }

        if (amount && changeCardNumber.length > 0) { createWithDraw(); }

    }

    const OnChangeAmountDialog = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.currentTarget.value))
    }

    const onChangeNumberCard = (event: SelectChangeEvent) => {
        const card: string = event.target.value;
        setChangeCardNumber(card);
    }

    const getDataCard = async () => {
        const cardData: CardDataFetch = await Fetch.request('http://localhost:3000/api/v1/getallcardamount', { token: token.token });

        if (cardData.status == 200) {
            setCards(cardData.data);

            setLoading(false);
            setChangeCardNumber('')

            setOpenDataWithdrawDialog(true);

        }

        else {
            setLoading(false)
            setMessageError("Ошибка получение данных!")
        }

    }

    const openMenu = () => {

        setLoading(true);

        getDataCard()
    }

    const getAllWithDraw = async () => {

        const getAllWithDraw: GetAllWithDraw = await Fetch.request('http://localhost:3000/api/v1/getallwithdraw', { token: token.token });

        if (getAllWithDraw.status == 200) {

            setLoading(false)

            if (getAllWithDraw.data.length) {
                setMessage(false)
                setDataWithdraw(getAllWithDraw.data);
            }

        } else {
            setLoading(false)
            setMessageError("Ошибка получение данных!")
        }

    }

    useEffect(() => {
        getAllWithDraw();

        let timer_id = setInterval(() => {

            getAllWithDraw();

        }, 3000);

        return () => clearInterval(timer_id);
    }, []);

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message={messageError} />

            <WithdrawDialog
                onClose={closeDataWithdrawDialog}
                onOk={onOkWithdraw}
                open={openDataWithdrawDialog}
                cards={cards}
                changeCardNumber={changeCardNumber}
                onChangeAmount={OnChangeAmountDialog}
                onChangeNumberCard={onChangeNumberCard}
            />

            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Вывод средств
                        </Typography>

                        <Wrapper>

                            {loading ? <Loading /> : <Box>

                                <ToggleButton value="check" color='success' selected={true} onClick={openMenu} >
                                    <AddIcon />
                                </ToggleButton>

                                <Box>

                                    {message ? <Box sx={{ color: '#000', marginTop: '30px' }}>Пока что нет выводов!</Box> : <Box sx={{ minWidth: { lg: '100%' }, marginTop: '30px', marginBottom: '30px', border: '1px solid #eee' }}>

                                        <TableContainer sx={{ maxHeight: 740 }}>
                                            <Table stickyHeader aria-label="sticky table">

                                                <TableHead>
                                                    <TableRow key={''}>
                                                        {columns.map((column, i) => (
                                                            <TableCell
                                                                key={''}
                                                                sx={{ textAlign: 'left' }}
                                                                style={{ minWidth: column.minWidth, textAlign: 'left', fontWeight: 'bold' }}
                                                            >
                                                                {column.label}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>

                                                    {dataWithdraw.map((e) =>

                                                        <TableRow hover role="checkbox" tabIndex={-1} key={''}>

                                                            <TableCell key={''} sx={{ textAlign: 'left' }}>
                                                                <Chip

                                                                    clickable
                                                                    label={WithdrawStatus[e.status]}

                                                                    color={

                                                                        WithdrawStatus[e.status] === 'SUCCESS' ? 'success' :
                                                                        WithdrawStatus[e.status] === 'PENDING' ? 'warning' : 'error'
                                                                    }

                                                                />
                                                            </TableCell>

                                                            <TableCell key={''} sx={{ textAlign: 'left', }}>{e.withdraw_card_number}</TableCell>

                                                            <TableCell key={''} sx={{ textAlign: 'left', }}>{e.amount}</TableCell>

                                                            <TableCell key={''} sx={{ textAlign: 'left', }}> {new Date(Number(e.created_at)).toLocaleString('ru-RU', { hour12: false })}</TableCell>

                                                        </TableRow>
                                                    )}

                                                </TableBody>

                                            </Table>
                                        </TableContainer>
                                    </Box>}
                                    {/* <Box sx={{color: '#000'}}>Пока что нет выводов!</Box> */}
                                    {/* <Box sx={{ minWidth: { lg: '100%' }, marginTop: '30px', marginBottom: '30px', border: '1px solid #eee' }}>

                                        <TableContainer sx={{ maxHeight: 740 }}>
                                            <Table stickyHeader aria-label="sticky table">

                                                <TableHead>
                                                    <TableRow key={''}>
                                                        {columns.map((column, i) => (
                                                            <TableCell
                                                                key={''}
                                                                sx={{ textAlign: 'left' }}
                                                                style={{ minWidth: column.minWidth, textAlign: 'left', fontWeight: 'bold' }}
                                                            >
                                                                {column.label}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>

                                                    {dataWithdraw.map((e) =>

                                                        <TableRow hover role="checkbox" tabIndex={-1} key={''}>

                                                            <TableCell key={''} sx={{ textAlign: 'left' }}>
                                                                <Chip

                                                                    clickable
                                                                    label={WithdrawStatus[e.status]}

                                                                    color={

                                                                        WithdrawStatus[e.status] === 'SUCCESS' ? 'success' :
                                                                            WithdrawStatus[e.status] === 'PENDING' ? 'warning' : 'error'
                                                                    }

                                                                />
                                                            </TableCell>

                                                            <TableCell key={''} sx={{ textAlign: 'left', }}>{e.card}</TableCell>

                                                            <TableCell key={''} sx={{ textAlign: 'left', }}>{e.amount}</TableCell>

                                                        </TableRow>
                                                    )}

                                                </TableBody>

                                            </Table>
                                        </TableContainer>
                                    </Box> */}
                                </Box>
                            </Box>
                            }

                        </Wrapper>

                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default Withdraw;
