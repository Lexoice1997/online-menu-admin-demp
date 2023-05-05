import { Route, Routes } from 'react-router-dom';
import Admin from '../Pages/Admin/Admin';
import Bot from '../Pages/Bot/Bot';
import SignIn from '../Pages/SingIn/SignIn';
import Statistics from '../Pages/Statistics/Statistics';
import Unauthorized from '../Pages/Unathorized/Unauthorized';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import Layout from '../layout/Layout';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Admin />} />
          <Route path="/menu" element={<Admin />} />
          <Route path="/waiting" element={<Bot botStatus="Expectation" botPage={1} />} />
          <Route path="/success" element={<Bot botStatus="Accepted" botPage={1} />} />
          <Route path="/refusal" element={<Bot botStatus="Refusal" botPage={1} />} />
          <Route path="/statistic" element={<Statistics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RoutesComponent;
