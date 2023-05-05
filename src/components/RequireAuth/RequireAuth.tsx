import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/redux';

function RequireAuth() {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
}

export default RequireAuth;
