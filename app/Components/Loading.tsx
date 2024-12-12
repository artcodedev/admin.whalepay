import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import * as styles from '@/app/Styles/styles';

import * as auth_style from '@/app/Styles/auth.style';
import CircularProgress from "@mui/material/CircularProgress";


const Loading = () => {
    return (
        <>
            <Container sx={styles.container}>

                <Box sx={auth_style.auth_wrapp}>

                    <CircularProgress color="secondary" />

                </Box>

            </Container>
        </>
    );
}

export default Loading;