'use client'

import * as React from 'react';

import * as style from '@/app/Styles/admin.styles';

import Container from '@mui/material/Container';
import Wrapper from '../Components/Wrapper';
import DrawerAdmin from '@/app/Components/DrawerAdmin';
import AppBarAdmin from '@/app/Components/AppBarAdmin'
import DialodLogoutAdmin from '@/app/Components/DialogLogoutAdmin';
import IndexPage from '@/app/Pages/Index.page';
import StickyHeadTable from '@/app/Pages/Transactions.page'
import CardsPage from '../Pages/Cards.page';
import Banks from '../Pages/Banks.page';


const Admin = () => {

  const [openLogOut, setOpenLogOut] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [checkMenuItem, setCheckMenuItem] = React.useState<number | null>(null)

  const toggleDrawer = (newOpen: boolean) => (): void => { setOpenDrawer(newOpen); };

  const toogleDialog = (cl: boolean) => (): void => { setOpenLogOut(cl); }

  const checkMenu = (item: number) => { setCheckMenuItem(item); }

  const actionLogOut = () => { setOpenLogOut(true); }

  return (

    <>

      <Container style={style.container_wrapp}>

        <Wrapper>

          <DrawerAdmin open={openDrawer} onClose={toggleDrawer} onCloseValue={false} checkMenu={checkMenu} checkMenuItem={checkMenuItem} width={250} />

          <AppBarAdmin onClickIconButton={toggleDrawer} onCloseValue={true} onClick={actionLogOut} />

          <DialodLogoutAdmin openLogOut={openLogOut} onCloseValue={false} onClickFalseValue={false} onClose={toogleDialog} onClickFalse={setOpenLogOut} />

          <Wrapper>

            {checkMenuItem == null ?  <IndexPage /> : <></>}

            {checkMenuItem == 1 ?  <Banks /> : <></>}

            {checkMenuItem == 0 ?  <StickyHeadTable /> : <></> }

            {checkMenuItem == 3 ?  <CardsPage /> : <></> } 
            
          </Wrapper>

        </Wrapper>

      </Container>


    </>

  );
}

export default Admin;