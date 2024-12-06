import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../../ui-component/ThemePalette';
import { patchApi } from 'views/services/api';
import { userSchema } from 'schema';

const EditAdmin = (props) => {
  const { open, handleClose, data } = props;

  const initialValues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.username,
    phoneNumber: data?.phoneNumber
  };

  const updateAdmin = async (values, resetForm) => {
    try {
      let response = await patchApi(`api/user/edit/${data?._id}`, values);
      console.log(response);
      if (response.status === 200) {
        toast.success('Admin updated successfully');
        handleClose();
        // resetForm();
      } else {
        toast.error('cannot update admin');
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot add admin');
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      updateAdmin(values, resetForm);
    }
  });
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Edit Admin</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ width: '100%', minWidth: '600px' }}>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* First Name */}
              <Grid item xs={12} sm={12} md={6} sx={{ marginTop: '10px' }}>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  label=""
                  size="small"
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              {/* Last Name  */}
              <Grid item xs={12} sm={12} md={6} sx={{ marginTop: '10px' }}>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  label=""
                  size="small"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              {/* Email  */}
              <Grid item xs={12} sm={12} md={6} sx={{ marginTop: '10px' }}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  label=""
                  size="small"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              {/* phone number  */}
              <Grid item xs={12} sm={12} md={6} sx={{ marginTop: '10px' }}>
                <FormLabel>Phone Number</FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label=""
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" style={{ backgroundColor: Palette.info, color: '#fff' }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAdmin;
