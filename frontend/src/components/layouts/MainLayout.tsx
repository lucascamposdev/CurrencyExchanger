import { useTheme } from '@/context/ThemeContext'
import Navbar from '../features/Navbar/Navbar'
import getCookieData from '@/utils/getCookieData';
import { Navigate, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const { theme } = useTheme();
  const cookieObject = getCookieData();
  
  return (
    <div className={`${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen flex flex-col`}>
      <Navbar/>
      {cookieObject?.userData ? <Outlet /> : <Navigate to="/auth/login"/>}
    </div>
  )
}

export default MainLayout