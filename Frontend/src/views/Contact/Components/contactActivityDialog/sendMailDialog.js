import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import SendIcon from '@mui/icons-material/Send';
import { postApi } from 'views/services/api';
import { toast } from 'react-toastify';

const SendMailDialog = ({ open, onClose, id, recipientEmail }) => {
  // console.log(onclose, 'function');
  // const navigate = useNavigate();
  const params = useParams();
  const contactId = params.id;

  //function for adding emails------------

  const handleSubmit = async (values) => {
    try {
      // setIsLoding(true);
      values.sender = JSON.parse(localStorage.getItem('user'))._id;
      let response = await postApi('api/email/add', values);
      if (response.status === 200) {
        toast.success('Email added successfully');
        // setTimeout(() => {
        // navigate(`dashboard/lead/view/${contactId}`);
        // }, 500);
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot add email');
    }
  };

  //-------------------------
  const formik = useFormik({
    initialValues: {
      recipient: contactId || id,
      subject: '',
      startDate: '',
      endDate: '',
      message: '',
      category: 'contact',

      createBy: contactId || id
    },
    validationSchema: Yup.object({
      recipient: Yup.string().email().required('Recipient is required'),
      subject: Yup.string().required('Subject is required'),
      startDate: Yup.string().required('Start Date is required'),
      endDate: Yup.string().required('End Date is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      handleSubmit(values);
      onClose();
    },
    enableReinitialize: true
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Recipient"
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            value={recipientEmail}
            error={formik.touched.recipient && Boolean(formik.errors.recipient)}
            helperText={formik.touched.recipient && formik.errors.recipient}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            variant="outlined"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
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
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />

          <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained" size="large">
              Close
            </Button>
            <Button startIcon={<SendIcon />} color="primary" type="submit" variant="contained" size="large">
              Send
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMailDialog;
