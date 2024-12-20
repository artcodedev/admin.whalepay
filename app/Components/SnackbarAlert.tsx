import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface Props {
    open: boolean
    duration: number
    handleClose: (e: boolean) => () => void
    message: string
}

const SnackbarAlert = ({...pr}: Props) => {


    return (
        <>
            <Snackbar open={pr.open} autoHideDuration={pr.duration} onClose={pr.handleClose(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>

                <Alert onClose={pr.handleClose(false)} severity='error' variant='filled' sx={{ width: '100%' }}>
                    {pr.message}
                </Alert>

            </Snackbar>
        </>
    );
}

export default SnackbarAlert;