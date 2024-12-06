import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './views/pages/authentication/authentication3/Login3';
import Register from 'views/pages/authentication/authentication3/Register3';
import PageRoutes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useState } from 'react';

// ==============================|| APP ||============================== //
const App = () => {
  const customization = useSelector((state) => state.customization);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if token and user are present
    if (storedToken && storedUser?.role) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />
        <NavigationScroll>
          {loading ? (
            <div></div>
          ) : token && user?.role ? (
            user?.role === 'admin' || user?.role === 'user' ? (
              <PageRoutes />
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
