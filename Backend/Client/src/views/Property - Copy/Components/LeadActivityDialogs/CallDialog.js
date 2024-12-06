import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';

const CallDialog = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      recipient: '',
      startDate: '',
      endDate: '',
      callDuration: '',
      callNotes: ''
    },
    validationSchema: Yup.object({
      recipient: Yup.string().required('Recipient is required'),
      startDate: Yup.string().required('Start Date is required'),
      endDate: Yup.string().required('End Date is required'),
      callDuration: Yup.string().required('Call Duration is required'),
      callNotes: Yup.string().required('Call Notes is required')
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
      <DialogTitle>Make Call</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Recipient"
            fullWidth
            margin="normal"
            variant="outlined"
            name="recipient"
            value={formik.values.recipient}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.recipient && Boolean(formik.errors.recipient)}
            helperText={formik.touched.recipient && formik.errors.recipient}
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
            label="Call Duration"
            fullWidth
            margin="normal"
            variant="outlined"
            name="callDuration"
            value={formik.values.callDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.callDuration && Boolean(formik.errors.callDuration)}
            helperText={formik.touched.callDuration && formik.errors.callDuration}
          />
          <TextField
            label="Call Notes"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            name="callNotes"
            value={formik.values.callNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.callNotes && Boolean(formik.errors.callNotes)}
            helperText={formik.touched.callNotes && formik.errors.callNotes}
          />

          <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained" size="large">
              Cancel
            </Button>
            <Button startIcon={<CallIcon />} color="primary" type="submit" variant="contained" size="large">
              Call
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
