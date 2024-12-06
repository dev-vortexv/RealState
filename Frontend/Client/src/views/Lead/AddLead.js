/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import { postApi } from 'views/services/api';
import * as yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import { leadSchema } from 'schema';

const AddLead = (props) => {
  const { open, handleClose } = props;

  const initialValues = {
    // Lead Information:
    leadName: '',
    leadEmail: '',
    leadPhoneNumber: '',
    leadAddress: '',
    // Lead Source and Details:
    leadSource: '',
    leadStatus: 'default',
    leadSourceDetails: '',
    leadCampaign: '',
    leadSourceChannel: '',
    leadSourceMedium: '',
    leadSourceCampaign: '',
    leadSourceReferral: '',
    // Lead Assignment and Ownership:
    leadAssignedAgent: '',
    leadOwner: '',
    leadCommunicationPreferences: '',
    // Lead Dates and Follow-up:
    leadCreationDate: '',
    leadConversionDate: '',
    leadFollowUpDate: '',
    leadFollowUpStatus: '',
    // Lead Scoring and Nurturing:
    leadScore: '',
    leadNurturingWorkflow: '',
    leadEngagementLevel: '',
    leadConversionRate: '',
    leadNurturingStage: '',
    leadNextAction: ''
  };

  const AddData = async (values) => {
    try {
      // setIsLoding(true);
      values.createBy = JSON.parse(localStorage.getItem('user'))._id;
      console.log(values);
      let response = await postApi('api/lead/createlead', values);
      if (response.status === 200) {
        formik.resetForm();
      }
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoding(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: leadSchema,
    onSubmit: async (values) => {
      // console.log('hey');
      AddData(values);
      handleClose();
      toast.success('Lead added successfully');
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
          <Typography variant="h6">Add New Lead</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* Basic Lead Information */}
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Basic Lead Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={4} md={6}>
                  <FormLabel>Lead Name</FormLabel>
                  <TextField
                    id="leadName"
                    name="leadName"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Name"
                    value={formik.values.leadName}
                    onChange={formik.handleChange}
                    error={formik.touched.leadName && Boolean(formik.errors.leadName)}
                    helperText={formik.touched.leadName && formik.errors.leadName}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <FormLabel>Lead Email</FormLabel>
                  <TextField
                    id="leadEmail"
                    name="leadEmail"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Email"
                    value={formik.values.leadEmail}
                    onChange={formik.handleChange}
                    error={formik.touched.leadEmail && Boolean(formik.errors.leadEmail)}
                    helperText={formik.touched.leadEmail && formik.errors.leadEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Phone Number</FormLabel>
                  <TextField
                    id="leadPhoneNumber"
                    name="leadPhoneNumber"
                    type="number"
                    size="small"
                    fullWidth
                    placeholder="Enter Phone Number"
                    value={formik.values.leadPhoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.leadPhoneNumber && Boolean(formik.errors.leadPhoneNumber)}
                    helperText={formik.touched.leadPhoneNumber && formik.errors.leadPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Lead Address</FormLabel>
                  <TextField
                    id="leadAddress"
                    name="leadAddress"
                    label=""
                    size="small"
                    multiline
                    rows={3}
                    placeholder="Enter Lead Address"
                    fullWidth
                    value={formik.values.leadAddress}
                    onChange={formik.handleChange}
                    error={formik.touched.leadAddress && Boolean(formik.errors.leadAddress)}
                    helperText={formik.touched.leadAddress && formik.errors.leadAddress}
                  />
                </Grid>
              </Grid>

              {/* Lead Source and Details */}
              <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
                Lead Source and Details
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Lead Source</FormLabel>
                    <TextField
                      id="leadSource"
                      name="leadSource"
                      label=""
                      size="small"
                      fullWidth
                      placeholder="Enter Lead Source"
                      value={formik.values.leadSource}
                      onChange={formik.handleChange}
                      error={formik.touched.leadSource && Boolean(formik.errors.leadSource)}
                      helperText={formik.touched.leadSource && formik.errors.leadSource}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Lead Status</FormLabel>
                    <Select
                      id="leadStatus"
                      name="leadStatus"
                      label=""
                      size="small"
                      fullWidth
                      value={formik.values.leadStatus}
                      onChange={formik.handleChange}
                      error={formik.touched.leadStatus && Boolean(formik.errors.leadStatus)}
                    >
                      <MenuItem value="default" disabled>
                        Select Lead Status
                      </MenuItem>
                      {/* Add your lead status options here */}
                      <MenuItem value="Pending">Peding</MenuItem>
                      <MenuItem value="Sold">Sold</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Source Details</FormLabel>
                  <TextField
                    id="leadSourceDetails"
                    name="leadSourceDetails"
                    label=""
                    size="small"
                    placeholder="Enter Lead Source Details"
                    fullWidth
                    value={formik.values.leadSourceDetails}
                    onChange={formik.handleChange}
                    error={formik.touched.leadSourceDetails && Boolean(formik.errors.leadSourceDetails)}
                    helperText={formik.touched.leadSourceDetails && formik.errors.leadSourceDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Campaign</FormLabel>
                  <TextField
                    id="leadCampaign"
                    name="leadCampaign"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Campaign"
                    value={formik.values.leadCampaign}
                    onChange={formik.handleChange}
                    error={formik.touched.leadCampaign && Boolean(formik.errors.leadCampaign)}
                    helperText={formik.touched.leadCampaign && formik.errors.leadCampaign}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Source Channel</FormLabel>
                  <TextField
                    id="leadSourceChannel"
                    name="leadSourceChannel"
                    label=""
                    size="small"
                    placeholder="Enter Lead Source Channel"
                    fullWidth
                    value={formik.values.leadSourceChannel}
                    onChange={formik.handleChange}
                    error={formik.touched.leadSourceChannel && Boolean(formik.errors.leadSourceChannel)}
                    helperText={formik.touched.leadSourceChannel && formik.errors.leadSourceChannel}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Source Medium</FormLabel>
                  <TextField
                    id="leadSourceMedium"
                    name="leadSourceMedium"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Source Medium"
                    value={formik.values.leadSourceMedium}
                    onChange={formik.handleChange}
                    error={formik.touched.leadSourceMedium && Boolean(formik.errors.leadSourceMedium)}
                    helperText={formik.touched.leadSourceMedium && formik.errors.leadSourceMedium}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Source Campaign</FormLabel>
                  <TextField
                    id="leadSourceCampaign"
                    name="leadSourceCampaign"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Sourc Campaign"
                    value={formik.values.leadSourceCampaign}
                    onChange={formik.handleChange}
                    error={formik.touched.leadSourceCampaign && Boolean(formik.errors.leadSourceCampaign)}
                    helperText={formik.touched.leadSourceCampaign && formik.errors.leadSourceCampaign}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Source Referral</FormLabel>
                  <TextField
                    id="leadSourceReferral"
                    name="leadSourceReferral"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Source Referral"
                    value={formik.values.leadSourceReferral}
                    onChange={formik.handleChange}
                    error={formik.touched.leadSourceReferral && Boolean(formik.errors.leadSourceReferral)}
                    helperText={formik.touched.leadSourceReferral && formik.errors.leadSourceReferral}
                  />
                </Grid>
              </Grid>

              {/* Lead Assignment and Ownership */}
              <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
                Lead Assignment and Ownership
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Assigned Agent</FormLabel>
                  <TextField
                    id="leadAssignedAgent"
                    name="leadAssignedAgent"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Assigned Agent"
                    value={formik.values.leadAssignedAgent}
                    onChange={formik.handleChange}
                    error={formik.touched.leadAssignedAgent && Boolean(formik.errors.leadAssignedAgent)}
                    helperText={formik.touched.leadAssignedAgent && formik.errors.leadAssignedAgent}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Owner</FormLabel>
                  <TextField
                    id="leadOwner"
                    name="leadOwner"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Owner"
                    value={formik.values.leadOwner}
                    onChange={formik.handleChange}
                    error={formik.touched.leadOwner && Boolean(formik.errors.leadOwner)}
                    helperText={formik.touched.leadOwner && formik.errors.leadOwner}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Lead Communication Preferences</FormLabel>
                  <TextField
                    id="leadCommunicationPreferences"
                    name="leadCommunicationPreferences"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Communication Preferences"
                    value={formik.values.leadCommunicationPreferences}
                    onChange={formik.handleChange}
                    error={formik.touched.leadCommunicationPreferences && Boolean(formik.errors.leadCommunicationPreferences)}
                    helperText={formik.touched.leadCommunicationPreferences && formik.errors.leadCommunicationPreferences}
                  />
                </Grid>
              </Grid>

              {/* Lead Dates and Follow-up */}
              <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
                Lead Dates and Follow-up
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Creation Date</FormLabel>
                  <TextField
                    id="leadCreationDate"
                    name="leadCreationDate"
                    type="date"
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Creation Date"
                    value={formik.values.leadCreationDate}
                    onChange={formik.handleChange}
                    error={formik.touched.leadCreationDate && Boolean(formik.errors.leadCreationDate)}
                    helperText={formik.touched.leadCreationDate && formik.errors.leadCreationDate}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Conversion Date</FormLabel>
                  <TextField
                    id="leadConversionDate"
                    name="leadConversionDate"
                    type="date"
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Conversion Date"
                    value={formik.values.leadConversionDate}
                    onChange={formik.handleChange}
                    error={formik.touched.leadConversionDate && Boolean(formik.errors.leadConversionDate)}
                    helperText={formik.touched.leadConversionDate && formik.errors.leadConversionDate}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead FollowUp Date</FormLabel>
                  <TextField
                    id="leadFollowUpDate"
                    name="leadFollowUpDate"
                    type="date"
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Followup date"
                    value={formik.values.leadFollowUpDate}
                    onChange={formik.handleChange}
                    error={formik.touched.leadFollowUpDate && Boolean(formik.errors.leadFollowUpDate)}
                    helperText={formik.touched.leadFollowUpDate && formik.errors.leadFollowUpDate}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={8}>
                  <FormControl fullWidth>
                    <FormLabel>Lead FollowUp Status</FormLabel>
                    <TextField
                      id="leadFollowUpStatus"
                      name="leadFollowUpStatus"
                      label=""
                      size="small"
                      fullWidth
                      placeholder="Enter Lead Follow Up status"
                      value={formik.values.leadFollowUpStatus}
                      onChange={formik.handleChange}
                      error={formik.touched.leadFollowUpStatus && Boolean(formik.errors.leadFollowUpStatus)}
                      helperText={formik.touched.leadFollowUpStatus && formik.errors.leadFollowUpStatus}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* Lead Scoring and Nurturing */}
              <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
                Lead Scoring and Nurturing
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Score</FormLabel>
                  <TextField
                    id="leadScore"
                    name="leadScore"
                    type="number"
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Score"
                    value={formik.values.leadScore}
                    onChange={formik.handleChange}
                    error={formik.touched.leadScore && Boolean(formik.errors.leadScore)}
                    helperText={formik.touched.leadScore && formik.errors.leadScore}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <FormLabel>Lead Nurturing Workflow</FormLabel>
                  <TextField
                    id="leadNurturingWorkflow"
                    name="leadNurturingWorkflow"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Nurturing Workflow"
                    value={formik.values.leadNurturingWorkflow}
                    onChange={formik.handleChange}
                    error={formik.touched.leadNurturingWorkflow && Boolean(formik.errors.leadNurturingWorkflow)}
                    helperText={formik.touched.leadNurturingWorkflow && formik.errors.leadNurturingWorkflow}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Engagement Level</FormLabel>
                  <TextField
                    id="leadEngagementLevel"
                    name="leadEngagementLevel"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Engagement Level"
                    value={formik.values.leadEngagementLevel}
                    onChange={formik.handleChange}
                    error={formik.touched.leadEngagementLevel && Boolean(formik.errors.leadEngagementLevel)}
                    helperText={formik.touched.leadEngagementLevel && formik.errors.leadEngagementLevel}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Conversion Rate</FormLabel>
                  <TextField
                    id="leadConversionRate"
                    name="leadConversionRate"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Conversion Rate"
                    value={formik.values.leadConversionRate}
                    onChange={formik.handleChange}
                    error={formik.touched.leadConversionRate && Boolean(formik.errors.leadConversionRate)}
                    helperText={formik.touched.leadConversionRate && formik.errors.leadConversionRate}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Lead Nurturing Stage</FormLabel>
                  <TextField
                    id="leadNurturingStage"
                    name="leadNurturingStage"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Nurturing Stage"
                    value={formik.values.leadNurturingStage}
                    onChange={formik.handleChange}
                    error={formik.touched.leadNurturingStage && Boolean(formik.errors.leadNurturingStage)}
                    helperText={formik.touched.leadNurturingStage && formik.errors.leadNurturingStage}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <FormLabel>Lead Next Action</FormLabel>
                  <TextField
                    id="leadNextAction"
                    name="leadNextAction"
                    label=""
                    size="small"
                    fullWidth
                    placeholder="Enter Lead Next Action"
                    value={formik.values.leadNextAction}
                    onChange={formik.handleChange}
                    error={formik.touched.leadNextAction && Boolean(formik.errors.leadNextAction)}
                    helperText={formik.touched.leadNextAction && formik.errors.leadNextAction}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: Palette.info,
              '&:hover': { backgroundColor: Palette.infoDark }
            }}
          >
            Add Lead
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLead;
