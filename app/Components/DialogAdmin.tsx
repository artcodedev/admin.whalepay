

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
    openLogOut: boolean
    onCloseValue: boolean
    onClickFalseValue: boolean
    onClose: (cl: boolean) => () => void
    onClickFalse: (cl: boolean) => void
    // onClickTrue: () => void
}


const DialodAdmin = ({...pr}: Props) => {


    return (
        <>
            <Dialog open={pr.openLogOut} onClose={pr.onClose(pr.onCloseValue)}>

                <DialogTitle>Log out</DialogTitle>

                <DialogContent>

                    <DialogContentText>Are you want log out?</DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button variant="contained" color='error' onClick={() => { pr.onClickFalse(pr.onClickFalseValue) }}>No</Button>

                    <Button variant="contained" color='success' autoFocus>Yes</Button>

                </DialogActions>

            </Dialog>
        </>
    );
}

export default DialodAdmin;