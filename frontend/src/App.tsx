import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

// Components
import AuthLayout from './components/layouts/AuthLayout'
import MainLayout from './components/layouts/MainLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { AuthProvider } from './hooks/useAuth'
import Home from './pages/Home/Home'

function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>

            {/* Layout de Autenticacao */}
            <Route path='/auth' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Layout Principal com Checagem de isAuthenticated */}
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
