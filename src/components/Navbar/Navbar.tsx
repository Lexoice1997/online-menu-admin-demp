import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import {
  BOT_REFUSAL,
  BOT_SUCCESS,
  BOT_WAITING,
  EMPLOYEE_BE,
  EMPLOYEE_LIST,
  EMPLOYEE_POSITION,
  FINANCE_ADVENT,
  FINANCE_EXPENSE,
  MAIN,
  MENU,
  PRODUCTS,
  STATISTIC_ALL,
  STATISTIC_BOT,
  STATISTIC_FINANCE,
  STATISTIC_STOCK,
  STOCK_ADVENT,
  STOCK_EXPENSE,
  STOCK_HISTORY,
} from '../../helpers/constants/routesConst';

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
          Demo
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
            active={pathname === MAIN}
            component={<Link to={MAIN} />}
            icon={<DashboardIcon sx={{ fontSize: '19px' }} />}
          >
            Главная
          </MenuItem>
          <MenuItem
            active={pathname === MENU}
            component={<Link to={MENU} />}
            icon={<RestaurantMenuIcon sx={{ fontSize: '19px' }} />}
          >
            Меню
          </MenuItem>
          <SubMenu label="Бот" icon={<SmartToyIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === BOT_WAITING} component={<Link to={BOT_WAITING} />}>
              Ожидание
            </MenuItem>
            <MenuItem active={pathname === BOT_SUCCESS} component={<Link to={BOT_SUCCESS} />}>
              Принято
            </MenuItem>
            <MenuItem active={pathname === BOT_REFUSAL} component={<Link to={BOT_REFUSAL} />}>
              Отказ
            </MenuItem>
          </SubMenu>
          <SubMenu label="Склад" icon={<StoreMallDirectoryIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === PRODUCTS} component={<Link to={PRODUCTS} />}>
              Продукты
            </MenuItem>
            <MenuItem active={pathname === STOCK_ADVENT} component={<Link to={STOCK_ADVENT} />}>
              Приход
            </MenuItem>
            <MenuItem active={pathname === STOCK_EXPENSE} component={<Link to={STOCK_EXPENSE} />}>
              Расход
            </MenuItem>
            <MenuItem active={pathname === STOCK_HISTORY} component={<Link to={STOCK_HISTORY} />}>
              Остаток
            </MenuItem>
          </SubMenu>
          <SubMenu label="Финанс" icon={<MonetizationOnIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === FINANCE_ADVENT} component={<Link to={FINANCE_ADVENT} />}>
              Приход
            </MenuItem>
            <MenuItem
              active={pathname === FINANCE_EXPENSE}
              component={<Link to={FINANCE_EXPENSE} />}
            >
              Расход
            </MenuItem>
          </SubMenu>
          <SubMenu label="Сотрудники" icon={<GroupsIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === EMPLOYEE_LIST} component={<Link to={EMPLOYEE_LIST} />}>
              Список
            </MenuItem>
            <MenuItem active={pathname === EMPLOYEE_BE} component={<Link to={EMPLOYEE_BE} />}>
              Отметка
            </MenuItem>
            <MenuItem
              active={pathname === EMPLOYEE_POSITION}
              component={<Link to={EMPLOYEE_POSITION} />}
            >
              Должности
            </MenuItem>
          </SubMenu>
          <SubMenu label="Статистика" icon={<EqualizerIcon sx={{ fontSize: '19px' }} />}>
            <MenuItem active={pathname === STATISTIC_ALL} component={<Link to={STATISTIC_ALL} />}>
              Все
            </MenuItem>
            <MenuItem active={pathname === STATISTIC_BOT} component={<Link to={STATISTIC_BOT} />}>
              Бот
            </MenuItem>
            <MenuItem
              active={pathname === STATISTIC_STOCK}
              component={<Link to={STATISTIC_STOCK} />}
            >
              Склад
            </MenuItem>
            <MenuItem
              active={pathname === STATISTIC_FINANCE}
              component={<Link to={STATISTIC_FINANCE} />}
            >
              Финанс
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Navbar;
