
'use client'

import Box from "@mui/material/Box"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

interface BoxData {
    type: string,
    data: string | undefined
}

const BoxDataTransactions = ({ ...pr }: BoxData) => {

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [typeSnackbar, setTypeSnackbar] = useState<string>('');

    const handleClose = () => { setSnackbar(false); }

    const copyData = (st: string, data: string) => () => {
        setTypeSnackbar(st);
        setSnackbar(true);
        navigator.clipboard.writeText(data)
    }

    return (
        <>
            <Snackbar
                open={snackbar}
                autoHideDuration={500}
                onClose={handleClose}
                message={`${typeSnackbar} скопирован!`}
            />
            <Box sx={{ marginTop: '7px' }}>

                {pr.type}:&nbsp;<span style={{ color: '#000' }}>{pr.data}</span>

                <ContentCopyIcon
                    onClick={copyData(pr.type, pr.data ? pr.data : '')}
                    sx={{ fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }}
                />

            </Box>
        </>
    )

}



export default BoxDataTransactions;