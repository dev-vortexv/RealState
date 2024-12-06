import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Link as LinkIcon, Delete as DeleteIcon } from '@mui/icons-material';

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
import { TaskSchema, leadSchema } from 'schema';

const LinkDialogbox = (props) => {
  const { open, handleClose, fileId } = props;
  const [assignmentToContactOptions, setAssignmentToContactOptions] = useState([]);
  const [assignmentToLeadOptions, setAssignmentToLeadOptions] = useState([]);

  const initialValues = {
    category: 'lead',

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

  const AddLink = async (values, resetForm) => {
    try {
      if (values.category === 'contact') {
        values.linkContact = values.assignment;
      } else {
        values.linkLead = values.assignment;
      }
      console.log(values);
      let response = await postApi(`api/document/link-document/${fileId}`, values);
      if (response.status === 200) {
        toast.success(`${values.category} Linked successfully`);
        handleClose();
        resetForm();
      } else {
        toast.error(`cannot add ${values.category} `);
      }
    } catch (e) {
      console.log(e);
      toast.error(`cannot add ${values.category} `);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      category: yup.string().required('Category is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      AddLink(values, resetForm);
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
          <Typography variant="h6">Link With Document</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ width: '100%', minWidth: '600px' }}>
          <form>
            {/* Related to */}
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <FormLabel sx={{ marginTop: '2px' }}>Link With</FormLabel>
                <RadioGroup row aria-label="category" name="category" value={formik.values.category} onChange={formik.handleChange}>
                  <FormControlLabel value="contact" control={<Radio />} label="Contact" />
                  <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Assignment To Contact */}
            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '3px' }}>
              <FormControl fullWidth>
                <FormLabel>{formik.values.category === 'contact' ? 'Link Contact' : 'Link Lead'}</FormLabel>
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
                          Select Link with contacts
                        </MenuItem>,
                        ...assignmentToContactOptions.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.firstName}
                          </MenuItem>
                        ))
                      ]
                    : [
                        <MenuItem key="default" value="default" disabled>
                          Select Link with Lead
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" style={{ backgroundColor: Palette.info, color: '#fff' }}>
            <LinkIcon fontSize="small" sx={{ mr: 1 }} /> Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LinkDialogbox;
