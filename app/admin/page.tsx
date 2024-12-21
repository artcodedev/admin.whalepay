'use client'

import * as React from 'react';
import * as style from '@/app/Styles/admin.styles';
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import Wrapper from '../Components/Wrapper';
import DrawerAdmin from '@/app/Components/DrawerAdmin';
import AppBarAdmin from '@/app/Components/AppBarAdmin'
import DialodLogoutAdmin from '@/app/Components/DialogLogoutAdmin';
import IndexPage from '@/app/Pages/Index.page';
import StickyHeadTable from '@/app/Pages/Transactions.page'
import CardsPage from '../Pages/Cards.page';
import Banks from '../Pages/Banks.page';
import { useRouter } from 'next/navigation';
import Loading from '../Components/Loading';
import { useAsyncEffect } from 'use-async-effect';
import { Fetch } from '../Utils/Fetch';
import { Answer } from '../Models/Answers/AnswerModels';

const Admin = () => {

  const [openLogOut, setOpenLogOut] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [checkMenuItem, setCheckMenuItem] = React.useState<number | null>(null);
  const [token, setToken] = useCookies(['token']);
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);

  useAsyncEffect( async () => {

    if (token.token?.length) {

      const token_varify: Answer = await Fetch.request('http://localhost:3000/api/v1/verify', {token: token.token});

      if (token_varify.status == 200) {setLoading(false)}
      
      if (token_varify.status != 200) { router.replace("/auth"); }

    } else { router.replace("/auth"); }

  }, [])

  const toggleDrawer = (newOpen: boolean) => (): void => { setOpenDrawer(newOpen); };

  const toogleDialog = (cl: boolean) => (): void => { setOpenLogOut(cl); }

  const checkMenu = (item: number) => { setCheckMenuItem(item); }

  const actionLogOut = () => { setOpenLogOut(true); }

  const onClickTrue = () => { setToken('token', ''); router.replace("/auth"); }

  return (

    <>

      <Container style={style.container_wrapp}>

        <Wrapper>

          {loading ? <Loading /> :
            <>
              <DrawerAdmin open={openDrawer} onClose={toggleDrawer} onCloseValue={false} checkMenu={checkMenu} checkMenuItem={checkMenuItem} width={250} />

              <AppBarAdmin onClickIconButton={toggleDrawer} onCloseValue={true} onClick={actionLogOut} />

              <DialodLogoutAdmin onClickTrue={onClickTrue} openLogOut={openLogOut} onCloseValue={false} onClickFalseValue={false} onClose={toogleDialog} onClickFalse={setOpenLogOut} />

              <Wrapper>

                {checkMenuItem == null ? <IndexPage /> : <></>}

                {checkMenuItem == 0 ? <StickyHeadTable /> : <></>}

                {checkMenuItem == 1 ? <Banks /> : <></>}

                {checkMenuItem == 3 ? <CardsPage /> : <></>}

              </Wrapper>

            </>

          }


        </Wrapper>

      </Container>


    </>

  );
}

export default Admin;