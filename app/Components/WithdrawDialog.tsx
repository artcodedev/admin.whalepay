import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, RefObject, useRef, useState } from "react";
import Loading from "./Loading";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import useAsyncEffect from "use-async-effect";
import { Fetch } from "../Utils/Fetch";
import { NumericFormat } from 'react-number-format';

interface CardData {
    card_number: string
    balance: number
}

interface Props {
    open: boolean
    cards: CardData[]
    changeCardNumber: string
    onClose: () => void
    onOk: () => void
    onChangeNumberCard: (e: SelectChangeEvent) => void
    onChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void
}



const WithdrawDialog = ({ ...pr }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    // const [numberCard, setNumberCard] = useState<string>('');

    const descriptionElementRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    return (
        <>
            <Dialog open={pr.open} onClose={pr.onClose} scroll="paper" fullWidth={true} >

                <DialogTitle id="scroll-dialog-title">Создать вывод средств</DialogTitle>

                <DialogContent dividers={false}>

                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} sx={{ marginTop: '20px', marginBottom: '20px' }}>
                        {loading ? <Loading /> :
                            <Box>

                                <Box sx={{ marginTop: '10px' }}>
                                    <FormControl fullWidth>

                                        <InputLabel id="demo-simple-select-label">Карта</InputLabel>

                                        <Select value={pr.changeCardNumber} label="Карта" onChange={pr.onChangeNumberCard} >

                                            {pr.cards.map((e) => <MenuItem value={e.card_number}>{e.card_number} ({e.balance} руб)</MenuItem>)}

                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ marginTop: '10px' }}>

                                    <NumericFormat
                                        value={0}
                                        onChange={pr.onChangeAmount}
                                        customInput={TextField}
                                        valueIsNumericString
                                        sx={{width: '100%'}}
                                        variant='outlined'
                                    />

                                </Box>

                                <DialogActions sx={{ padding: '0px', marginTop: '10px' }}>

                                    <Button variant="contained" color='success' sx={{ width: '100%' }} onClick={pr.onOk}>Выполнить</Button>

                                    <Button variant="contained" color="error" sx={{ width: '100%' }} onClick={pr.onClose}>Отмена</Button>

                                </DialogActions>

                            </Box>}
                    </DialogContentText>

                </DialogContent>

            </Dialog>


        </>
    );
}

export default WithdrawDialog;