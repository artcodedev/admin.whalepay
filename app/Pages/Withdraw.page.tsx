import Container from "@mui/material/Container";
import Wrapper from "../Components/Wrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../Components/Loading";
import { useState } from "react";
import * as style from '@/app/Styles/styles';
import ToggleButton from "@mui/material/ToggleButton";
import AddIcon from '@mui/icons-material/Add';



const Withdraw = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const openMenu = () => {
        console.log("open menu")
    }

    return (
        <>
            <Container sx={{ minWidth: { lg: '100%' } }}>

                <Wrapper>

                    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                        <Typography variant="h5" noWrap component="div" sx={style.main_title}>
                            Все банки
                        </Typography>

                        <Wrapper>

                            {loading ? <Loading /> : <Box>

                                <ToggleButton value="check" color='success' selected={true} onClick={openMenu} >
                                    <AddIcon />
                                </ToggleButton>

                                <Box>menu</Box>


                                <Box>table</Box>
                            </Box>}

                        </Wrapper>

                    </Box>

                </Wrapper>
            </Container>
        </>
    );
}

export default Withdraw;