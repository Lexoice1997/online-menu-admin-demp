import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import styles from './Navbar.module.css';

// function Navbar() {
//   const { pathname } = useLocation();
//   return (
//     <div className={styles.navbar}>
//       <div className={styles.logo}>
//         <h1>LOGO</h1>
//       </div>

//       <Link to="/">
//         <div className={pathname === '/' ? styles.linksActive : styles.links}>
//           <div className={styles.linksItems}>
//             <RestaurantMenuIcon />
//             <p className="text-sm font-semibold">Menu</p>
//           </div>
//         </div>
//       </Link>

//       <Link to="/bot">
//         <div className={pathname === '/bot' ? styles.linksActive : styles.links}>
//           <div className={styles.linksItems}>
//             <SmartToyIcon />
//             <p>Bot</p>
//           </div>
//         </div>
//       </Link>

//       <Link to="/statistic">
//         <div className={pathname === '/statistic' ? styles.linksActive : styles.links}>
//           <div className={styles.linksItems}>
//             <EqualizerIcon />
//             <p>Statistic</p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default Navbar;

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Typography
          sx={{
            color: '#0098e5',
            fontWeight: 700,
            marginBottom: '24px',
            marginTop: '16px',
            marginLeft: '20px',
            fontSize: '25px',
          }}
        >
          Grand Lavash
        </Typography>

        <Menu
          menuItemStyles={{
            root: {
              fontSize: '17px',
              fontWeight: 400,
            },
            icon: {
              width: '10px',
              height: '10px',
              color: themes.light.menu.icon,
            },
            SubMenuExpandIcon: {
              color: '#b6b7b9',
            },
            // eslint-disable-next-line consistent-return
            button: ({ level, active }) => {
              if (level === 0 || level === 1)
                return {
                  backgroundColor: active ? themes.light.menu.hover.backgroundColor : undefined,
                  '&:hover': {
                    backgroundColor: themes.light.menu.hover.backgroundColor,
                    color: themes.light.menu.hover.color,
                  },
                };
            },
          }}
        >
          <MenuItem
            active={pathname === '/'}
            component={<Link to="/" />}
            icon={<DashboardIcon sx={{ fontSize: '19px' }} />}
          >
            Главная
          </MenuItem>
          <MenuItem
            active={pathname === '/menu'}
            component={<Link to="/menu" />}
            icon={<RestaurantMenuIcon sx={{ fontSize: '19px' }} />}
          >
            Меню
          </MenuItem>
          <SubMenu label="Бот" icon={<SmartToyIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === '/waiting'} component={<Link to="/waiting" />}>
              Ожидание
            </MenuItem>
            <MenuItem active={pathname === '/success'} component={<Link to="/success" />}>
              Принято
            </MenuItem>
            <MenuItem active={pathname === '/refusal'} component={<Link to="/refusal" />}>
              Отказ
            </MenuItem>
          </SubMenu>
          <MenuItem
            active={pathname === '/statistic'}
            component={<Link to="/statistic" />}
            icon={<EqualizerIcon sx={{ fontSize: '19px' }} />}
          >
            Статистика
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Navbar;
