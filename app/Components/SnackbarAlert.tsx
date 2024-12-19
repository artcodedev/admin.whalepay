import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useEffect, useState } from "react";


interface Props {
    open: boolean
    duration: number
    handleClose: (e: boolean) => () => void
}


const SnackbarAlert = ({...pr}: Props) => {


    return (
        <>
            <Snackbar open={pr.open} autoHideDuration={pr.duration} onClose={pr.handleClose(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>

                <Alert onClose={pr.handleClose(false)} severity='error' variant='filled' sx={{ width: '100%' }}>
                    Ошибка получение данных!
                </Alert>

            </Snackbar>
        </>
    );
}

export default SnackbarAlert;