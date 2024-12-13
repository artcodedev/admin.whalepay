'use client'

import * as React from 'react';

import * as styles from '@/app/Styles/styles';

import * as auth_style from '@/app/Styles/auth.style';


import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Visibility } from '@material-ui/icons';
import Loading from '@/app/Components/Loading';

import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function Auth() {

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [login, setLogin] = React.useState<string>('');
  const [pass, setPass] = React.useState<string>('');
  const [errorLogin, setErrorLogin] = React.useState<boolean>(false);
  const [errorPass, setErrorPass] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [token, setToken] = useCookies(['token']);

  React.useEffect(() => {
    // if(token) router.replace("/audit");
  })

  const ShowPassword = () => { setShowPassword(showPassword ? false : true) }

  const sendData = () => {

    const regExp: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const checkEmail: RegExpMatchArray | null = login.toLowerCase().match(regExp);

    if (login.length == 0 || checkEmail == null) setErrorLogin(true);
    if (pass.length < 6) setErrorPass(true);

    if (login.toLowerCase().match(regExp) && pass.length > 6) {

      // send

    }

  }

  return (

    <>

      {loading ? <Loading /> : <Container maxWidth='lg' sx={styles.container}>

        <Box sx={auth_style.auth_wrapp}>

          <Typography variant="h6" style={auth_style.auth_title}>Login</Typography>

          <Box style={auth_style.auth_pole_box}>

            <FormControl sx={{ width: '100%' }} size='small' variant="outlined">

              <InputLabel>Login</InputLabel>

              <OutlinedInput type={'text'}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setLogin(e.currentTarget.value) }}

                onFocus={() => { setErrorLogin(false) }}

                error={errorLogin}

                label="Login"
              />

            </FormControl>

          </Box>

          <Box style={auth_style.auth_pole_box}>
            <FormControl sx={{ width: '100%' }} size='small' variant="outlined">

              <InputLabel>Password</InputLabel>

              <OutlinedInput type={showPassword ? 'text' : 'password'}

                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setPass(e.currentTarget.value) }}

                error={errorPass}

                onFocus={() => { setErrorPass(false) }}

                endAdornment={
                  <InputAdornment position="end">

                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={ShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}

                    </IconButton>

                  </InputAdornment>
                }
                label="Password"
              />

            </FormControl>

          </Box>

          <Box style={auth_style.auth_pole_box}>
            <Button style={auth_style.button} variant="contained" onClick={sendData}>ok</Button>
          </Box>

        </Box>

      </Container>
      }

    </>
  );
}
