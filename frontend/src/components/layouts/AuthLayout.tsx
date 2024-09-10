import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { theme } = useTheme();
    const userData = useAuth().userData;
    const validateToken = useAuth().validateToken;

    useEffect(() =>{
      validateToken();
    }, [])

  return (
    <div className={`${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen flex items-center justify-center`}>
        {userData ? <Navigate to="/"/> : <Outlet />}
    </div>
  )
}

export default AuthLayout