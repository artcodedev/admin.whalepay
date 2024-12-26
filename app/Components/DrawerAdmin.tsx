

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { MenuItemData } from '@/app/Models/Admin';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface Props {
    open: boolean
    onCloseValue: boolean
    checkMenuItem: number | null
    width: number | 250
    checkMenu: (e: number) => void
    onClose: (cl: boolean) => () => void
}

const hover_menu = {
    '&:hover': {
        background: 'rgba(25, 118, 210, 0.22)'
    }
}

const MenuItem: MenuItemData[] = [
    {
        title: "Транзакции",
        icon: <PaidIcon />
    },
    {
        title: "Банки",
        icon: <AccountBalanceIcon />
    },
    {
        title: "Вывод",
        icon: <CurrencyExchangeIcon />
    },
    {
        title: "Карты",
        icon: <CreditCardIcon />
    },

    {
        title: "СМС",
        icon: <CreditCardIcon />
    }
];

const DrawerAdmin = ({ ...pr }: Props) => {

    return (
        <>
            <Drawer open={pr.open} onClose={pr.onClose(pr.onCloseValue)}>

                <Box sx={{ width: pr.width }} role="presentation" onClick={pr.onClose(pr.onCloseValue)}>

                    <List>

                        {MenuItem.map((e, i) => <ListItem key={e.title} disablePadding  >

                            <ListItemButton onClick={() => pr.checkMenu(i)} selected={pr.checkMenuItem === i} sx={hover_menu}>

                                <ListItemIcon>{e.icon}</ListItemIcon>
                                <ListItemText primary={e.title} />

                            </ListItemButton>

                        </ListItem>)}

                    </List>

                </Box>
            </Drawer>
        </>
    );
}

export default DrawerAdmin;