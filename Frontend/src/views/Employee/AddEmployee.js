import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Slider } from '@mui/material';
import { useFormik } from 'formik';
import { contactSchema } from 'schema';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { postApi } from 'views/services/api';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const AddEmployee = (props) => {
  const { open, handleClose } = props;

  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  };
  const AddData = async (values, resetForm) => {
    try {
      let response = await postApi('api/user/register', values);
      if (response.status === 200) {
        toast.success('Employee Registered Successfully');
        handleClose();
        resetForm();
      } else {
        toast.error('contact register employee');
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot register employee');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      firstName: yup.string().required('First Name Is required'),
      lastName: yup.string(),
      username: yup.string().email().required('Email Is required'),
      password: yup.string().required('password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log('employee', values);
      AddData(values, resetForm);
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Employee</Typography>
          <Typography>
            <Button onClick={handleClose} style={{ color: 'red' }}>
              Cancel
            </Button>
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  fullWidth
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  size="small"
                  fullWidth
                  placeholder="Enter Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="username"
                  name="username"
                  size="small"
                  fullWidth
                  value={formik.values.username}
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter Phone Number"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Add Employee
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployee;
