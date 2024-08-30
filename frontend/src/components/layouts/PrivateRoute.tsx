import TOKEN_COOKIE_NAME from '@/utils/TOKEN_COOKIE_NAME';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  return token ? <>{children}</> : <Navigate to="/auth/login"/>
}

export default PrivateRoute