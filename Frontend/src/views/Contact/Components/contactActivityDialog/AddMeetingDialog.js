import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { postApi } from 'views/services/api';
import { useNavigate } from 'react-router';

const AddMeetingDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const params = useParams();
  const contactId = params.id;

  //function for adding emails------------

  const handleSubmit = async (values) => {
    try {
      // setIsLoding(true);
      values.createBy = JSON.parse(localStorage.getItem('user'))._id;
      let response = await postApi('api/meeting/add', values);
      if (response.status === 200) {
        toast.success('Meeting added successfully');
        // setTimeout(() => {
        // navigate(`dashboard/lead/view/${leadId}`);
        // }, 500);
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot create meeting');
    }
  };
  const formik = useFormik({
    initialValues: {
      agenda: '',
      relatedTo: '',
      location: '',
      dateTime: '',
      notes: '',
      attendes: [contactId]
    },
    validationSchema: Yup.object({
      agenda: Yup.string().required('Agenda is required'),
      location: Yup.string().required('Location is required'),
      dateTime: Yup.string().required('Date Time is required')
    }),

    onSubmit: (values) => {
      handleSubmit(values);
      // formik.resetForm();
      onClose();
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Meeting</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Agenda"
            fullWidth
            margin="normal"
            variant="outlined"
            name="agenda"
            value={formik.values.agenda}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.agenda && Boolean(formik.errors.agenda)}
            helperText={formik.touched.agenda && formik.errors.agenda}
          />
          <p>Related To</p>
          <RadioGroup aria-label="Related To" name="relatedTo" value={formik.values.relatedTo} onChange={formik.handleChange}>
            <FormControlLabel value="contact" control={<Radio />} label="Contact" />
            <FormControlLabel value="lead" control={<Radio />} label="Lead" />
          </RadioGroup>
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            variant="outlined"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <TextField
            label="Date Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            name="dateTime"
            value={formik.values.dateTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
            helperText={formik.touched.dateTime && formik.errors.dateTime}
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
            <Button startIcon={<VideoChatIcon />} color="primary" type="submit" variant="contained" size="large">
              Add Meeting
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMeetingDialog;
