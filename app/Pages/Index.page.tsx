
import * as React from 'react';

import * as style from '@/app/Styles/admin.styles';

import Container from '@mui/material/Container';
import Wrapper from '../Components/Wrapper';

import Typography from '@mui/material/Typography';


const IndexPage = () => {

    return (
        <>
            <Container style={style.wrapp_admin} >

                <Wrapper>

                    <Wrapper>

                        <Container style={style.wrapp_admin_n_width} >

                            <Typography variant="h3" component="h2" style={style.main_title_hand}>👋</Typography>

                        </Container>

                    </Wrapper>

                    <Wrapper>

                        <Container style={style.wrapp_admin_n_width} >

                            <Typography variant="h4" color='info' sx={style.main_title}>
                                Welcome to Whale<span>Pay</span>
                            </Typography>

                        </Container>

                    </Wrapper>

                    <Wrapper>

                        <Container style={style.wrapp_admin_n_width} >

                            <Typography variant="h6" color='info' sx={style.main_title_upper}>
                                All pay with our service 😊 🔥
                            </Typography>

                        </Container>

                    </Wrapper>

                </Wrapper>

            </Container>
        </>
    );
}

export default IndexPage;