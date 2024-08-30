import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { theme } = useTheme();
    const { user, validateToken } = useAuth();

    useEffect(() =>{
      validateToken();
    }, [])

  return (
    <div className={`${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen flex items-center justify-center`}>
        {user ? <Navigate to="/"/> : <Outlet />}
    </div>
  )
}

export default AuthLayout