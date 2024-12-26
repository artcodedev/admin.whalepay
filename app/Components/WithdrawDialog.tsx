import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RefObject, useRef, useState } from "react";
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


interface Props {
    open: boolean
    onClose: () => void
    onOk: () => void
}



const WithdrawDialog = ({ ...pr }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [numberCard, setNumberCard] = useState<string>('');

    const descriptionElementRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    const onChangeNumberCard = (event: SelectChangeEvent) => {
        const card: string = event.target.value;
        console.log(card)
    }

    

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

                                        <Select value={numberCard} label="Карта" onChange={onChangeNumberCard} >

                                            <MenuItem value={'0000111122223333'}>0000111122223333 (546546 руб)</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ marginTop: '10px' }}>
                                    <TextField id="outlined-basic" label="Сумма" variant="outlined" sx={{ width: '100%' }} />
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