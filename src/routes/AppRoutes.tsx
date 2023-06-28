import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import Layout from '../components/layout/Layout';
import {
  BOT_REFUSAL,
  BOT_SUCCESS,
  BOT_WAITING,
  EMPLOYEE_BE,
  EMPLOYEE_DETAIL,
  EMPLOYEE_LIST,
  EMPLOYEE_POSITION,
  FINANCE_ADVENT,
  FINANCE_EXPENSE,
  MAIN,
  MENU,
  PRODUCTS,
  SIGN_IN,
  STATISTIC_BOT,
  STATISTIC_FINANCE,
  STATISTIC_STOCK,
  STOCK_ADVENT,
  STOCK_EXPENSE,
  STOCK_HISTORY,
  UNAUTHORIZED,
} from '../helpers/constants/routesConst';
import Bot from '../pages/Bot/Bot';
import EmployeeBe from '../pages/EmployeeBe/EmployeeBe';
import EmployeeDetail from '../pages/EmployeeDetail/EmployeeDetail';
import EmployeeList from '../pages/EmployeeList/EmployeeList';
import EmployeePosition from '../pages/EmployeePosition/EmployeePosition';
import FinanceAdvent from '../pages/FinanceAdvent/FinanceAdvent';
import FinanceExpense from '../pages/FinanceExpense/FinanceExpense';
import Admin from '../pages/Main/Main';
import Products from '../pages/Products/Products';
import SignIn from '../pages/SingIn/SignIn';
import BotStatistics from '../pages/StatisticsBot/StatisticsBot';
import StatisticsFinance from '../pages/StatisticsFinance/StatisticsFinance';
import StatisticsStock from '../pages/StatisticsStock/StatisticsStock';
import StockAdvent from '../pages/StockAdvent/StockAdvent';
import StockExpense from '../pages/StockExpense/StockExpense';
import StockHistory from '../pages/StockHistory/StockHistory';
import Unauthorized from '../pages/Unathorized/Unauthorized';

function AppRoutes() {
  return (
    <Routes>
      <Route path={UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route element={<RequireAuth />}>
        <Route path={MAIN} element={<Layout />}>
          <Route path={MAIN} element={<Admin />} />
          <Route path={MENU} element={<Admin />} />
          <Route path={BOT_WAITING} element={<Bot botStatus="Expectation" botPage={1} />} />
          <Route path={BOT_SUCCESS} element={<Bot botStatus="Accepted" botPage={1} />} />
          <Route path={BOT_REFUSAL} element={<Bot botStatus="Refusal" botPage={1} />} />
          <Route path={STOCK_ADVENT} element={<StockAdvent />} />
          <Route path={STOCK_EXPENSE} element={<StockExpense />} />
          <Route path={STOCK_HISTORY} element={<StockHistory />} />
          <Route path={FINANCE_ADVENT} element={<FinanceAdvent />} />
          <Route path={FINANCE_EXPENSE} element={<FinanceExpense />} />
          <Route path={STATISTIC_BOT} element={<BotStatistics />} />
          <Route path={STATISTIC_FINANCE} element={<StatisticsFinance />} />
          <Route path={STATISTIC_STOCK} element={<StatisticsStock />} />
          <Route path={EMPLOYEE_LIST} element={<EmployeeList />} />
          <Route path={EMPLOYEE_DETAIL} element={<EmployeeDetail />} />
          <Route path={EMPLOYEE_POSITION} element={<EmployeePosition />} />
          <Route path={EMPLOYEE_BE} element={<EmployeeBe />} />
          <Route path={PRODUCTS} element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
