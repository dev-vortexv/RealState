import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

import axios from 'axios';
import * as yup from 'yup';

import { toast } from 'react-toastify';
// material-ui
import { useTheme } from '@mui/material/styles';
import { postApi } from 'views/services/api';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

const AddEmployee = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Item>
        <Typography variant="h5" sx={{ margin: '5px' }}>
          Add Employee
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: yup.string().required('First Name Is required'),
            lastName: yup.string(),
            username: yup.string().email().required('Email Is required'),
            password: yup.string().required('password is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            console.log(values, 'register form values');
            try {
              postApi('api/user/register', values)
                .then((response) => {
                  toast.success('Employee Added Successfully!');
                  console.log(response);
                  resetForm();
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message);
                  if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                });

              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error(err);
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="username"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.username}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 5, float: 'right' }}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                    Add Employee
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      </Item>
    </>
  );
};

export default AddEmployee;
