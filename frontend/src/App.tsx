import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

// Components
import AuthLayout from './components/layouts/AuthLayout'
import PrivateRoute from './components/layouts/PrivateRoute'
import MainLayout from './components/layouts/MainLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { AuthProvider } from './hooks/useAuth'

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
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
