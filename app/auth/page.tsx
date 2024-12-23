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

import { KeyboardEvent, useEffect } from 'react';

import { Fetch } from '../Utils/Fetch';

import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

interface ResponseeAuth {
  status: number
  token?: string
  message?: string
}

export default function Auth() {

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [login, setLogin] = React.useState<string>('');
  const [pass, setPass] = React.useState<string>('');
  const [errorLogin, setErrorLogin] = React.useState<boolean>(false);
  const [errorPass, setErrorPass] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [token, setToken] = useCookies(['token']);

  useEffect(() => {
    if (token.token?.length) {
      router.replace("/admin");
    } else {
      setLoading(false);
    }
  }, [token])

  const ShowPassword = () => { setShowPassword(showPassword ? false : true) }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter') {sendData()}

  }

  const sendData = async () => {

    if (login.length < 6) setErrorLogin(true);
    if (pass.length < 6) setErrorPass(true);

    if (login.length > 6 && pass.length > 6) {

      const auth: ResponseeAuth = await Fetch.request('/api/v1/auth', { login: login, password: pass });

      if (auth.status !== 200) {

        setErrorLogin(true);
        setErrorPass(true);

      }

      if (auth.status == 200) {

        if (auth.token) {
          setToken('token', auth.token);
          router.replace("/admin");
        } else {
          router.replace("/");
        }

      }

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

                onKeyDown={handleKeyPress}

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

                onKeyDown={handleKeyPress}

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
