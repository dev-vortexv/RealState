import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const CreateTaskDialog = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      related: 'none',
      description: '',
      startDate: '',
      endDate: '',
      url: '',
      notes: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      related: Yup.string().required('Related is required'),
      startDate: Yup.string().required('Start Date is required'),
      endDate: Yup.string().required('End Date is required')
    }),
    onSubmit: (values) => {
      // Handle submission logic here
      console.log('Form values:', values);

      // Reset the form and close the dialog
      formik.resetForm();
      onClose();
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <p>Related</p>
          <RadioGroup aria-label="Related" name="related" value={formik.values.related} onChange={formik.handleChange}>
            <FormControlLabel value="none" control={<Radio />} label="None" />
            <FormControlLabel value="contact" control={<Radio />} label="Contact" />
            <FormControlLabel value="lead" control={<Radio />} label="Lead" />
          </RadioGroup>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            label="Start Date"
            type="datetime-local"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
          <TextField
            label="URL"
            fullWidth
            margin="normal"
            variant="outlined"
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            label="Notes"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained" size="large">
              Cancel
            </Button>
            <Button startIcon={<AddIcon />} color="primary" type="submit" variant="contained" size="large">
              Create Task
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
