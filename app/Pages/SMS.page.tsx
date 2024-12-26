import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Typography from "@mui/material/Typography";
import Loading from "../Components/Loading";
import { useState } from "react";
import * as style from '@/app/Styles/styles';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Column } from "../Models/BanksPageModel";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useCookies } from 'react-cookie';
import SnackbarAlert from "../Components/SnackbarAlert";
import { Fetch } from "../Utils/Fetch";
import useAsyncEffect from "use-async-effect";

interface DataNumber {
    phone: string
    date: string
    message: string
}

interface FetchDataSms {
    status: number
    data: DataNumber[]
}

interface NumberPhoneData {
    phone: string
}

interface NumberPhone {
    status: number
    data: NumberPhoneData[]
}

const columns: readonly Column[] = [
    {
        label: 'Номер',
        minWidth: 30
    },

    {
        label: 'Дата',
        minWidth: 30
    },

    {
        label: 'Сообщение',
        minWidth: 30,
    }

];

const SMSPage = () => {

    const [token,] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(true);
    const [messageError, setMessageError] = useState<boolean>(false);
    const [data, setData] = useState<DataNumber[]>([]);
    const [phonesData, setPhonesData] = useState<NumberPhoneData[]>([])
    const [openError, setOpenError] = useState<boolean>(false);
    const [numberVal, setNumberVal] = useState<string>('');

    const handleCloseError = (e: boolean) => (): void => { setOpenError(e); };

    const fetchDataSms = async (phone: string) => {

        const smsData: FetchDataSms = await Fetch.request('http://localhost:3000/api/v1/getallsms', { token: token.token, phone: phone });

        setLoading(false)

        if (smsData.status == 200) {
            setData(smsData.data.reverse())
            setMessageError(false)
        } else {
            setMessageError(true)
            setOpenError(true)
        }
    }

    const onChangeNumber = (event: SelectChangeEvent) => {

        setLoading(true);
        const phone: string = event.target.value;
        fetchDataSms(phone);
        setNumberVal(phone);

    };

    useAsyncEffect(async () => {

        const phoneData: NumberPhone = await Fetch.request('http://localhost:3000/api/v1/getallphones', { token: token.token });

        if (phoneData.status == 200) {

            setPhonesData(phoneData.data);
            setLoading(false);
        }
        else {
            setOpenError(true)
        }
    }, []);

    return (
        <>

            <SnackbarAlert open={openError} duration={4000} handleClose={handleCloseError} message="Ошибка получение данных!" />

            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>

                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            СМС
                        </Typography>

                        <Wrapper>

                            {loading ? <Loading /> : 

                                <Box>

                                    <Box sx={{ minWidth: 200, maxWidth: '400px' }}>
                                        <FormControl fullWidth>

                                            <InputLabel id="demo-simple-select-label">Номер телефон</InputLabel>

                                            <Select value={numberVal} label="Номер телефона" onChange={onChangeNumber} >

                                                <MenuItem value={'+79020542692'}>+79020542692</MenuItem>

                                                {phonesData.map((e) => <MenuItem value={e.phone}>{e.phone}</MenuItem>)}

                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box>

                                        { messageError ? <Box sx={{ color: '#000', margin: '30px 0px' }}>Не удалось получить смс по этому номеру!</Box> : data.length ? <Box sx={{ minWidth: { lg: '100%' }, marginTop: '30px', marginBottom: '30px', border: '1px solid #eee' }}>

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

                                                        {data.map((e) =>

                                                            <TableRow hover role="checkbox" tabIndex={-1} key={''}>

                                                                <TableCell key={''} sx={{ textAlign: 'left' }}>{e.phone}</TableCell>

                                                                <TableCell key={''} sx={{ textAlign: 'left', }}>{e.date}</TableCell>

                                                                <TableCell key={''} sx={{ textAlign: 'left', }}>{e.message}</TableCell>

                                                            </TableRow>)}

                                                    </TableBody>

                                                </Table>
                                            </TableContainer>
                                        </Box> : <Box sx={{ marginTop: '30px', color: '#000' }}>Выберите номер </ Box>}

                                    </Box>

                                </Box>}

                        </Wrapper>

                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default SMSPage;