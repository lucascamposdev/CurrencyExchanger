import { useTheme } from '@/context/ThemeContext';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { theme } = useTheme();

  return (
    <div className={`${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen flex items-center justify-center`}>
        <Outlet />
    </div>
  )
}

export default AuthLayout