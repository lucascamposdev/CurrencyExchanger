import { useTheme } from '@/context/ThemeContext'
import Navbar from '../features/Navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const MainLayout = () => {
  const { theme } = useTheme();
  const userData = useAuth().userData;
  const validateToken = useAuth().validateToken;

  useEffect(() =>{
    validateToken()
  }, [])
  
  return (
    <div className={`h-auto min-h-screen ${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen flex flex-col`}>
      <Navbar/>
      {userData ? <Outlet /> : <Navigate to="/auth/login"/>}
    </div>
  )
}

export default MainLayout