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
import { toast } from 'react-toastify';
import Palette from '../../../../ui-component/ThemePalette';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { MeetingSchema } from 'schema';
import { useEffect } from 'react';
import { getApi, postApi } from 'views/services/api';

const AddMeetingDialog = (props) => {
  const { open, onClose } = props;
  const [assignmentToContactOptions, setAssignmentToContactOptions] = useState([]);
  const [contactId, setContactId] = useState([]);
  const [assignmentToLeadOptions, setAssignmentToLeadOptions] = useState([]);
  const [selectedContactValues, setSelectedcontactValues] = useState([]);
  const [selectedLeadValues, setSelectedLeadValues] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  const initialValues = {
    agenda: '',
    attendes: [],
    attendesLead: [],
    location: '',
    related: 'contact',
    dateTime: '',
    notes: ''
  };

  const handleContactDropdownChange = (event, newValues) => {
    const newContactIds = newValues.map((contactName) => {
      const contact = assignmentToContactOptions.find((item) => item.firstName === contactName);
      return contact ? contact._id : null;
    });
    setSelectedcontactValues(newValues);
    setSelectedContactIds(newContactIds.filter((id) => id !== null));
    formik.setFieldValue(
      'attendes',
      newContactIds.filter((id) => id !== null)
    );
  };

  const handleLeadDropdownChange = (event, newValues) => {
    const newLeadIds = newValues.map((leadName) => {
      const lead = assignmentToLeadOptions.find((item) => item.leadName === leadName);
      return lead ? lead._id : null;
    });
    setSelectedLeadValues(newValues);
    setSelectedLeadIds(newLeadIds.filter((id) => id !== null));
    formik.setFieldValue(
      'attendesLead',
      newLeadIds.filter((id) => id !== null)
    );
  };

  const AddMeeting = async (values, resetForm) => {
    try {
      values.createdBy = JSON.parse(localStorage.getItem('user'))._id;
      console.log(values, 'add meetings values');
      let response = await postApi('api/meeting/add', values);
      if (response.status === 200) {
        toast.success('Meetings Added successfully');
        onClose();
        resetForm();
      } else {
        toast.error('Cannot Add Meeting');
      }
    } catch (e) {
      console.log(e);
      toast.error('Cannot Add Meeting');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: MeetingSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('meeting values', values);
      AddMeeting(values, resetForm);
    }
  });

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
          <Typography variant="h6">Create Meeting</Typography>
          <Typography>
            <ClearIcon onClick={onClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ width: '100%', minWidth: '600px' }}>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* Agenda */}
              <Grid item xs={12} sm={12} md={6}>
                <FormLabel>Agenda</FormLabel>
                <TextField
                  id="agenda"
                  name="agenda"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Agenda"
                  value={formik.values.agenda}
                  onChange={formik.handleChange}
                  error={formik.touched.agenda && Boolean(formik.errors.agenda)}
                  helperText={formik.touched.agenda && formik.errors.agenda}
                />
              </Grid>

              {/* Related to */}
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel sx={{ marginTop: '2px' }}>Related To</FormLabel>
                  <RadioGroup row aria-label="related" name="related" value={formik.values.related} onChange={formik.handleChange}>
                    <FormControlLabel value="contact" control={<Radio />} label="Contact" />
                    <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* preferred attendies to */}
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel sx={{ marginTop: '4px' }}>
                    Choose Preferred Attendes {formik.values.related === 'contact' ? 'Contact' : 'Lead'}
                  </FormLabel>

                  {formik.values.related === 'contact' ? (
                    <div>
                      <Autocomplete
                        id="attendes"
                        options={assignmentToContactOptions.map((items) => {
                          return items.firstName;
                        })}
                        // getOptionLabel={(option) => option}
                        value={selectedContactValues}
                        onChange={handleContactDropdownChange}
                        multiple
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            size="small"
                            placeholder="Type Name"
                            fullWidth
                            InputLabelProps={{
                              shrink: true
                            }}
                            error={formik.touched.attendes && Boolean(formik.errors.attendes)}
                            helperText={formik.touched.attendes && formik.errors.attendes}
                          />
                        )}
                      />
                      <div style={{ marginTop: '8px' }}>
                        {selectedContactValues.map((value, index) => (
                          <Chip
                            key={index}
                            label={value}
                            onDelete={() => {
                              const newValues = [...selectedContactValues];
                              newValues.splice(index, 1);
                              setSelectedcontactValues(newValues);
                              formik.setFieldValue('attendes', newValues);
                            }}
                            style={{ marginRight: '8px', marginBottom: '8px' }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Autocomplete
                        id="attendesLead"
                        options={assignmentToLeadOptions?.map((items) => {
                          return items?.leadName;
                        })}
                        // getOptionLabel={(option) => option}
                        value={selectedLeadValues}
                        onChange={handleLeadDropdownChange}
                        multiple
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            size="small"
                            placeholder="Type Name"
                            fullWidth
                            InputLabelProps={{
                              shrink: true
                            }}
                            error={formik.touched.attendesLead && Boolean(formik.errors.attendesLead)}
                            helperText={formik.touched.attendesLead && formik.errors.attendesLead}
                          />
                        )}
                      />
                      <div style={{ marginTop: '8px' }}>
                        {selectedLeadValues.map((value, index) => (
                          <Chip
                            key={index}
                            label={value}
                            onDelete={() => {
                              const newValues = [...selectedLeadValues];
                              newValues.splice(index, 1);
                              setSelectedLeadValues(newValues);
                              formik.setFieldValue('attendesLead', newValues);
                            }}
                            style={{ marginRight: '8px', marginBottom: '8px' }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel sx={{ marginTop: '2px' }}>Location</FormLabel>
                <TextField
                  id="location"
                  name="location"
                  label=""
                  size="small"
                  multiline
                  rows={1}
                  fullWidth
                  placeholder="Enter Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>

              {/*  Date */}
              <Grid item xs={12} sm={4} md={4} sx={{ marginTop: '3px' }}>
                <FormLabel>Date Time</FormLabel>
                <TextField
                  id="dateTime"
                  name="dateTime"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.dateTime}
                  onChange={formik.handleChange}
                  error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                  helperText={formik.touched.dateTime && formik.errors.dateTime}
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
                  placeholder="Enter Meeting Notes"
                  rows={5}
                  fullWidth
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
            Add Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMeetingDialog;
