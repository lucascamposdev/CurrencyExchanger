import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

// Components
import AuthLayout from './components/layouts/AuthLayout'
import PrivateRoute from './components/layouts/PrivateRoute'
import MainLayout from './components/layouts/MainLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider>
      <BrowserRouter>
          <Routes>

            {/* Layout de Autenticacao */}
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Layout Principal com Checagem de isAuthenticated */}
            <Route
            path='/app'
            element={
              <PrivateRoute isAuthenticated={user ? true : false}>
                <MainLayout/>
              </PrivateRoute>
            }
            />

          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
