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
import Palette from '../../../../ui-component/ThemePalette';
import { getApi, postApi } from 'views/services/api';
import { useEffect } from 'react';
import { TaskSchema } from 'schema';

const AddTask = (props) => {
  const { open, onClose } = props;
  const [assignmentToContactOptions, setAssignmentToContactOptions] = useState([]);
  const [assignmentToLeadOptions, setAssignmentToLeadOptions] = useState([]);

  const initialValues = {
    title: '',
    category: 'lead',
    description: '',
    notes: '',
    start: '',
    end: '',
    url: '',
    assignment: 'default'
  };

  // ----------------------------------------------------------------------
  // function for fetching all the contacts data from the db

  const fetchContactsData = async () => {
    try {
      const response = await getApi('api/contact/viewallcontacts');
      setAssignmentToContactOptions(response.data.contactDetails);
    } catch (error) {
      console.log(error);
    }
  };
  // function for fetching all the leads data from the db

  const fetchLeadsData = async () => {
    try {
      const response = await getApi('api/lead/viewallleads');
      setAssignmentToLeadOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactsData();
    fetchLeadsData();
  }, []);

  const AddTask = async (values, resetForm) => {
    try {
      values.createBy = JSON.parse(localStorage.getItem('user'))._id;
      if (values.category === 'contact') {
        values.assignmentTo = values.assignment;
      } else {
        values.assignmentToLead = values.assignment;
      }
      console.log(values);
      let response = await postApi('api/task/add', values);
      if (response.status === 200) {
        toast.success('Task Added successfully');
        handleClose();
        resetForm();
      } else {
        toast.error('Task already exists');
      }
    } catch (e) {
      console.log(e);
      toast.error('Cannot Add Task');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: TaskSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('task values', values);
      AddTask(values, resetForm);
    }
  });
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Create Task</Typography>
          <Typography>
            <ClearIcon onClick={onClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ width: '100%', minWidth: '600px' }}>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* Title */}
              <Grid item xs={12} sm={12} md={6}>
                <FormLabel>Title</FormLabel>
                <TextField
                  id="title"
                  name="title"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

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
                  <FormLabel>{formik.values.category === 'contact' ? 'Assignment To Contact' : 'Assignment To Lead'}</FormLabel>
                  <Select
                    id="assignment"
                    name="assignment"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.assignment}
                    onChange={formik.handleChange}
                    error={formik.touched.assignment && Boolean(formik.errors.assignment)}
                  >
                    {formik.values.category === 'contact'
                      ? [
                          <MenuItem key="default" value="default" disabled>
                            Select Assignment To Contact
                          </MenuItem>,
                          ...assignmentToContactOptions.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.firstName}
                            </MenuItem>
                          ))
                        ]
                      : [
                          <MenuItem key="default" value="default" disabled>
                            Select Assignment To Lead
                          </MenuItem>,
                          ...assignmentToLeadOptions.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.leadName}
                            </MenuItem>
                          ))
                        ]}
                  </Select>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel sx={{ marginTop: '2px' }}>Description</FormLabel>
                <TextField
                  id="description"
                  name="description"
                  label=""
                  size="small"
                  placeholder="Enter Description"
                  multiline
                  rows={5}
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} sm={4} md={4} sx={{ marginTop: '3px' }}>
                <FormLabel>Start Date</FormLabel>
                <TextField
                  id="start"
                  name="start"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.start}
                  onChange={formik.handleChange}
                  error={formik.touched.start && Boolean(formik.errors.start)}
                  helperText={formik.touched.start && formik.errors.start}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={4} md={4} sx={{ marginTop: '3px' }}>
                <FormLabel>End Date</FormLabel>
                <TextField
                  id="end"
                  name="end"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.end}
                  onChange={formik.handleChange}
                  error={formik.touched.end && Boolean(formik.errors.end)}
                  helperText={formik.touched.end && formik.errors.end}
                />
              </Grid>

              {/* URL */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
                <FormLabel>URL</FormLabel>
                <TextField
                  id="url"
                  name="url"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Task Link"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url}
                />
              </Grid>

              {/* Notes */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
                <FormLabel>Notes</FormLabel>
                <TextField
                  id="notes"
                  name="notes"
                  label=""
                  size="small"
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Enter Notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" style={{ backgroundColor: Palette.info, color: '#fff' }}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTask;
