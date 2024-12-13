


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
    onCloseValue: boolean
    onClick: () => void
    onClickIconButton: (cl: boolean) => () => void
}

const AppBarAdmin = ({...pr}: Props) => {


    return (
        <>

            <Box>

                <AppBar position="static">

                    <Toolbar sx={{ justifyContent: "space-between" }}>

                        <IconButton edge="start" color="inherit" onClick={pr.onClickIconButton(pr.onCloseValue)}>
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap component="div">
                            WHALE<span>PAY</span>
                        </Typography>

                        <Box sx={{ display: { xs: 'flex' } }} >
                            <IconButton size="large" edge='end' color="inherit" onClick={pr.onClick}>
                                <AccountCircleIcon />
                            </IconButton>
                        </Box>

                    </Toolbar>

                </AppBar>

            </Box>
        </>
    );
}


export default AppBarAdmin;