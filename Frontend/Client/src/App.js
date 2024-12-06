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

// ==============================|| APP ||============================== //
const App = () => {
  const customization = useSelector((state) => state.customization);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />
        <NavigationScroll>
          {token && user?.role ? (
            user?.role === 'admin' || user?.role === 'user' ? (
              <PageRoutes />
            ) : (
              <Route path="*" element={<Navigate to="/pages/login/login3" />} />
            )
          ) : (
            <Routes>
              <Route path="/pages/login/login3" element={<LoginPage />} />
              <Route path="/pages/register/register3" element={<Register />} />
              <Route path="*" element={<Navigate to="/pages/login/login3" />} />
            </Routes>
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
