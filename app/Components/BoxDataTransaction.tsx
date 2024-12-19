
'use client'

import Box from "@mui/material/Box"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { SnackbarMessage } from "./DataCards";

interface BoxData {
    type: string,
    data: string | undefined
}

const BoxDataTransactions = ({ ...pr }: BoxData) => {

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [typeSnackbar, setTypeSnackbar] = useState<string>('');

    const contentCopyIcon = { fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

    const handleClose = () => { setSnackbar(false); }

    const copyData = (st: string, data: string) => () => {
        setTypeSnackbar(st);
        setSnackbar(true);
        navigator.clipboard.writeText(data)
    }

    const handleExited = () => { setMessageInfo(undefined); };


    return (
        <>
            <Snackbar
                open={snackbar}
                autoHideDuration={500}
                TransitionProps={{ onExited: handleExited }}
                onClose={handleClose}
                message={`${typeSnackbar} скопирован!`}
            />
            <Box sx={{marginTop: '7px'}}>

                {pr.type}:&nbsp;<span style={{ color: '#000' }}>{pr.data}</span>

                <ContentCopyIcon onClick={copyData(pr.type, pr.data ? pr.data : '')} sx={contentCopyIcon} />

            </Box>
        </>
    )

}



export default BoxDataTransactions;