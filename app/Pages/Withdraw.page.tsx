import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../Components/Loading";
import { useState } from "react";
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
    }

];

enum WithdrawStatus {
    PENDING,
    SUCCESS,
    FAILED
}


interface DataWithdraw {
    status: WithdrawStatus
    card: string
    amount: number
}

interface CardData {
    card: string
    amonut: number
}
interface CardDataFetch {
    status: number
    data: CardData[]
}

const Withdraw = () => {

    const [token,] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataWithdraw, setDataWithdraw] = useState<DataWithdraw[]>([]);

    const [messageError, setMessageError] = useState<string>('')
    const [openError, setOpenError] = useState<boolean>(false);

    const [openDataWithdrawDialog, setOpenDataWithdrawDialog] = useState<boolean>(false);

    const handleClose = (e: boolean) => (): void => { setOpenError(e); };

    const closeDataWithdrawDialog = () => {
        setOpenDataWithdrawDialog(false)
    }

    const onOkWithdraw = () => {

        setOpenDataWithdrawDialog(false)
        setLoading(true);

    }

    const getDataCard = async () => {
        const cardData: CardDataFetch = await Fetch.request('http://localhost:3000/api/v1/getallcardamount', { token: token });

        console.log(cardData)

        if (cardData.status == 200) {

        }

        else {
            setLoading(false)
            setMessageError("Ошибка получение данных!")
        }


    }

    const openMenu = () => {
        console.log("open menu")

        setLoading(true);

        getDataCard()

        // setDataWithdraw([
        //     { status: WithdrawStatus['FAILED'], card: '0000000000000000', amount: 10 }
        // ])
    }

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleClose} message={messageError} />

            <WithdrawDialog onClose={closeDataWithdrawDialog} onOk={onOkWithdraw} open={openDataWithdrawDialog} />

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

                                <Box>menu</Box>


                                <Box>
                                    <Box sx={{ minWidth: { lg: '100%' }, marginTop: '30px', marginBottom: '30px', border: '1px solid #eee' }}>

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
                                    </Box>
                                </Box>
                            </Box>}

                        </Wrapper>

                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default Withdraw;
