import getCookieData from '@/utils/getCookieData';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

const PrivateRoute = ({ children }: Props) => {

  const data = getCookieData();

  return data?.token ? <>{children}</> : <Navigate to="/auth/login"/>
}

export default PrivateRoute