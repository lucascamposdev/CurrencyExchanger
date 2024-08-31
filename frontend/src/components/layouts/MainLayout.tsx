import { useTheme } from '@/context/ThemeContext'
import Navbar from '../features/Navbar/Navbar'

const MainLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'light' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} h-screen `}>
      <Navbar/>
    </div>
  )
}

export default MainLayout