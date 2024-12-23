'use client'

import * as React from 'react';

// import Wrapper from '@/app/Components/Wrapper';

import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



export default function Home() {

  return (

    <>

      <Container style={{ position: 'absolute', minHeight: '100%', minWidth: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>

        <div style={{ textAlign: 'center' }}>

          <Typography variant="h4" component="h2" style={{ margin: '20px' }} color='#575757'>
            Welcome to admin WhalePay
          </Typography>

          <a href="/auth">
            <Button variant="contained">Log in</Button>
          </a>

        </div>


      </Container>

    </>
  );
}
