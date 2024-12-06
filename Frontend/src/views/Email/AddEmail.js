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
import Palette from '../../ui-component/ThemePalette';
import { getApi, postApi } from 'views/services/api';
import { useEffect } from 'react';
import { emailSchema } from 'schema';

const AddEmail = (props) => {
  const { open, handleClose } = props;
  const [assignmentToContactOptions, setAssignmentToContactOptions] = useState([]);
  const [assignmentToLeadOptions, setAssignmentToLeadOptions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const initialValues = {
    recipient: 'default',
    subject: '',
    startDate: '',
    endDate: '',
    message: '',
    category: 'lead'
  };

  // ----------------------------------------------------------------------
  // function for fetching all the contacts data from the db

  const fetchContactsData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/contact/viewallcontacts' : `api/contact/viewusercontacts/${user._id}`);
      user.role === 'admin' ? setAssignmentToContactOptions(response.data.contactDetails) : setAssignmentToContactOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // function for fetching all the leads data from the db

  const fetchLeadsData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/lead/viewallleads' : `api/lead/viewuserleads/${user._id}`);
      setAssignmentToLeadOptions(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactsData();
    fetchLeadsData();
  }, []);

  const AddEmail = async (values, resetForm) => {
    values.sender = JSON.parse(localStorage.getItem('user'))._id;
    try {
      if (values.category === 'contact') {
        values.createBy = values.recipient;
      } else {
        values.createByLead = values.recipient;
      }

      let response = await postApi('api/email/add', values);
      if (response.status === 200) {
        toast.success('Email Added successfully');
        handleClose();
        resetForm();
      } else {
        toast.error('Cannot Add Email');
        resetForm();
      }
    } catch (e) {
      toast.error('Cannot Add Email');
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      AddEmail(values, resetForm);
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
          <Typography variant="h6">Create Email</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ width: '100%', minWidth: '600px' }}>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* Related to */}
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel sx={{ marginTop: '2px' }}>Related To</FormLabel>
                  <RadioGroup row aria-label="category" name="category" value={formik.values.category} onChange={formik.handleChange}>
                    <FormControlLabel value="contact" control={<Radio />} label="Contact" />
                    <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Assignment To Contact */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
                <FormControl fullWidth>
                  <FormLabel>{formik.values.category === 'contact' ? 'Recipient ( contact )' : 'Recipient ( lead )'}</FormLabel>
                  <Select
                    id="recipient"
                    name="recipient"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.recipient}
                    onChange={formik.handleChange}
                    error={formik.touched.recipient && Boolean(formik.errors.recipient)}
                  >
                    {formik.values.category === 'contact'
                      ? [
                          <MenuItem key="default" value="default" disabled>
                            Assignment To
                          </MenuItem>,
                          ...assignmentToContactOptions.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.email}
                            </MenuItem>
                          ))
                        ]
                      : [
                          <MenuItem key="default" value="default" disabled>
                            Assignment To
                          </MenuItem>,
                          ...assignmentToLeadOptions.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.leadEmail}
                            </MenuItem>
                          ))
                        ]}
                  </Select>
                </FormControl>
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} sm={4} md={4} sx={{ marginTop: '3px' }}>
                <FormLabel>Start Date</FormLabel>
                <TextField
                  id="startDate"
                  name="startDate"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={4} md={4} sx={{ marginTop: '3px' }}>
                <FormLabel>End Date</FormLabel>
                <TextField
                  id="endDate"
                  name="endDate"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>

              {/* Subject */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
                <FormLabel>Subject</FormLabel>
                <TextField
                  id="subject"
                  name="subject"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>

              {/* Message */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
                <FormLabel>Message</FormLabel>
                <TextField
                  id="message"
                  name="message"
                  label=""
                  size="small"
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Enter Message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                />
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" style={{ backgroundColor: Palette.info, color: '#fff' }}>
            Add Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmail;
