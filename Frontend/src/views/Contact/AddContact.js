import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Slider } from '@mui/material';
import { useFormik } from 'formik';
import { contactSchema } from 'schema';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { postApi } from 'views/services/api';
import { toast } from 'react-toastify';

const AddContact = (props) => {
  const { open, handleClose } = props;

  const initialValues = {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phoneNumber: '',
    mobileNumber: '',
    physicalAddress: '',
    mailingAddress: '',
    preferredContactMethod: '',
    // 2.Lead Source Information
    leadSource: 'default',
    referralSource: 'default',
    campaignSource: 'default',
    // 3. Status and Classifications
    leadStatus: 'default',
    leadRating: 0,
    leadConversionProbability: 'default',
    // 5. History:
    notesandComments: '',
    // 6. Tags or Categories
    tagsOrLabelsForcategorizingcontacts: 'default',
    // 7. Important Dates::
    birthday: '',
    anniversary: '',
    keyMilestones: '',
    // 8. Additional Personal Information
    dob: '',
    gender: '',
    occupation: '',
    interestsOrHobbies: '',
    // 9. Preferred  Communication Preferences:
    communicationFrequency: '',
    preferences: '',
    // 10. Social Media Profiles:
    linkedInProfile: '',
    facebookProfile: '',
    twitterHandle: '',
    otherProfiles: '',
    // 11. Lead Assignment and Team Collaboration:
    agentOrTeamMember: '',
    internalNotesOrComments: ''
  };

  const AddData = async (values, resetForm) => {
    try {
      values.createBy = JSON.parse(localStorage.getItem('user'))._id;
      let response = await postApi('api/contact/addMany', values);
      if (response.status === 200) {
        toast.success('Contact Add successfully');
        handleClose();
        // resetForm();
      } else {
        toast.error('contact already exists');
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot add contact');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('ContactValues', values);
      AddData(values, resetForm);
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Contact</Typography>
          <Typography>
            <Button onClick={handleClose} style={{ color: 'red' }}>
              Cancel
            </Button>
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Information
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  fullWidth
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  size="small"
                  fullWidth
                  placeholder="Enter Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Title</FormLabel>
                <TextField
                  id="title"
                  name="title"
                  size="small"
                  fullWidth
                  placeholder="Enter Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  size="small"
                  fullWidth
                  value={formik.values.email}
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Phone Number</FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="number"
                  fullWidth
                  placeholder="Enter Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Mobile Number</FormLabel>
                <TextField
                  id="mobileNumber"
                  name="mobileNumber"
                  size="small"
                  type="number"
                  fullWidth
                  placeholder="Enter Mobile Number"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Physical Address</FormLabel>
                <TextField
                  id="physicalAddress"
                  name="physicalAddress"
                  size="small"
                  fullWidth
                  placeholder="Enter Physical Address"
                  value={formik.values.physicalAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.physicalAddress && Boolean(formik.errors.physicalAddress)}
                  helperText={formik.touched.physicalAddress && formik.errors.physicalAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Mailing Address</FormLabel>
                <TextField
                  id="mailingAddress"
                  name="mailingAddress"
                  size="small"
                  fullWidth
                  placeholder="Enter Mailing Address"
                  value={formik.values.mailingAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.mailingAddress && Boolean(formik.errors.mailingAddress)}
                  helperText={formik.touched.mailingAddress && formik.errors.mailingAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Preferred Contact Method</FormLabel>
                <TextField
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  size="small"
                  fullWidth
                  placeholder="Enter Preferred Contact Method"
                  value={formik.values.preferredContactMethod}
                  onChange={formik.handleChange}
                  error={formik.touched.preferredContactMethod && Boolean(formik.errors.preferredContactMethod)}
                  helperText={formik.touched.preferredContactMethod && formik.errors.preferredContactMethod}
                />
              </Grid>
            </Grid>

            {/* //-------------------------Lead Source Information______________________________________ */}
            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Lead Source Information
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Lead Source</FormLabel>
                <Select
                  id="leadSource"
                  name="leadSource"
                  size="small"
                  fullWidth
                  value={formik.values.leadSource}
                  onChange={formik.handleChange}
                  error={formik.touched.leadSource && Boolean(formik.errors.leadSource)}
                >
                  <MenuItem value="default" disabled>
                    Select Lead Source
                  </MenuItem>
                  <MenuItem value="Webiste">Webiste</MenuItem>
                  <MenuItem value="Referrals">Referrals</MenuItem>
                  <MenuItem value="Advertising">Advertising</MenuItem>
                  <MenuItem value="Events and rade Shows">Events and rade Shows</MenuItem>
                  <MenuItem value="Call centers or Telemarketing">Call centers or Telemarketing</MenuItem>
                  <MenuItem value="Direct Mail">Direct Mail</MenuItem>
                  <MenuItem value="Online Aggregators or Comparision Webiste">Online Aggregators or Comparision Webiste </MenuItem>
                  <MenuItem value="Content Marketing">Content Marketing</MenuItem>
                </Select>
                <FormHelperText error={formik.touched.leadSource && formik.errors.leadSource}>
                  {formik.touched.leadSource && formik.errors.leadSource}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Referral Source</FormLabel>
                <Select
                  id="referralSource"
                  name="referralSource"
                  size="small"
                  fullWidth
                  value={formik.values.referralSource}
                  onChange={formik.handleChange}
                  error={formik.touched.referralSource && Boolean(formik.errors.referralSource)}
                >
                  <MenuItem value="default" disabled>
                    Select Referral Source
                  </MenuItem>
                  <MenuItem value="Friend">Friend</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Colleague">Colleague</MenuItem>
                </Select>
                <FormHelperText error={formik.touched.referralSource && formik.errors.referralSource}>
                  {formik.touched.referralSource && formik.errors.referralSource}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Campaign Source</FormLabel>
                <Select
                  id="campaignSource"
                  name="campaignSource"
                  size="small"
                  fullWidth
                  value={formik.values.campaignSource}
                  onChange={formik.handleChange}
                  error={formik.touched.campaignSource && Boolean(formik.errors.campaignSource)}
                >
                  <MenuItem value="default" disabled>
                    Select Campaign Source
                  </MenuItem>
                  <MenuItem value="Google Ads">Google Ads</MenuItem>
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Email Campaign">Email Campaign</MenuItem>
                  <MenuItem value="Referrals">Referrals</MenuItem>
                </Select>
                <FormHelperText error={formik.touched.campaignSource && formik.errors.campaignSource}>
                  {formik.touched.campaignSource && formik.errors.campaignSource}
                </FormHelperText>
              </Grid>
            </Grid>

            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Status and Classifications
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Lead Status ( if applicable )</FormLabel>
                <Select
                  id="leadStatus"
                  name="leadStatus"
                  size="small"
                  fullWidth
                  value={formik.values.leadStatus}
                  onChange={formik.handleChange}
                  error={formik.touched.leadStatus && Boolean(formik.errors.leadStatus)}
                >
                  <MenuItem value="default" disabled>
                    Select Lead Status
                  </MenuItem>
                  <MenuItem value="New Lead">New Lead</MenuItem>
                  <MenuItem value="Qualified Lead">Qualified Lead</MenuItem>
                  <MenuItem value="Negotiating">Negotiating</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
                <FormHelperText error={formik.touched.leadStatus && formik.errors.leadStatus}>
                  {formik.touched.leadStatus && formik.errors.leadStatus}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Lead Rating ( {formik.values.leadRating} )</FormLabel>
                <Slider
                  defaultValue={formik.values.leadRating}
                  onChange={(e, value) => formik.setFieldValue('leadRating', value)}
                  min={0}
                  max={1}
                  step={0.1}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <FormLabel>Lead Conversion Probability</FormLabel>
                <Select
                  id="leadConversionProbability"
                  name="leadConversionProbability"
                  size="small"
                  fullWidth
                  value={formik.values.leadConversionProbability}
                  onChange={formik.handleChange}
                  error={formik.touched.leadConversionProbability && Boolean(formik.errors.leadConversionProbability)}
                >
                  <MenuItem value="default" disabled>
                    Select Lead Conversion Proability
                  </MenuItem>
                  <MenuItem value="New Lead">New Lead</MenuItem>
                  <MenuItem value="Qualified Lead">Qualified Lead</MenuItem>
                  <MenuItem value="Negotiating">Negotiating</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
                <FormHelperText error={formik.touched.leadConversionProbability && formik.errors.leadConversionProbability}>
                  {formik.touched.leadConversionProbability && formik.errors.leadConversionProbability}
                </FormHelperText>
              </Grid>
            </Grid>

            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Tags or Categories
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Tags or Labels for Categorizing Contacts</FormLabel>
                <Select
                  id="tagsOrLabelsForcategorizingcontacts"
                  name="tagsOrLabelsForcategorizingcontacts"
                  size="small"
                  fullWidth
                  value={formik.values.tagsOrLabelsForcategorizingcontacts}
                  onChange={formik.handleChange}
                  error={formik.touched.tagsOrLabelsForcategorizingcontacts && Boolean(formik.errors.tagsOrLabelsForcategorizingcontacts)}
                >
                  <MenuItem value="default" disabled>
                    Select Tags or Labels
                  </MenuItem>
                  <MenuItem value="Seller">Seller</MenuItem>
                  <MenuItem value="Investor">Investor</MenuItem>
                  <MenuItem value="First-Time Homebuyer">First-Time Homebuyer</MenuItem>
                </Select>
                <FormHelperText
                  error={formik.touched.tagsOrLabelsForcategorizingcontacts && formik.errors.tagsOrLabelsForcategorizingcontacts}
                >
                  {formik.touched.tagsOrLabelsForcategorizingcontacts && formik.errors.tagsOrLabelsForcategorizingcontacts}
                </FormHelperText>
              </Grid>
            </Grid>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }} sx={{ marginTop: '1px' }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Notes and Comments</FormLabel>
                <TextField
                  id="notesandComments"
                  name="notesandComments"
                  size="small"
                  placeholder="Enter Notes and Comments"
                  multiline
                  rows={4}
                  fullWidth
                  value={formik.values.notesandComments}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            {/* //-----------------------------additional Information______________________________________ */}
            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Additional Information
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 2 }}>
              {/* Add any additional fields here */}

              <Grid item xs={12} sm={6}>
                <FormLabel>Birthday</FormLabel>
                <TextField
                  id="birthday"
                  name="birthday"
                  size="small"
                  type="date"
                  fullWidth
                  placeholder="Enter Birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Anniversary</FormLabel>
                <TextField
                  id="anniversary"
                  name="anniversary"
                  size="small"
                  type="date"
                  fullWidth
                  placeholder="Enter Anniversary"
                  value={formik.values.anniversary}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Key Milestones</FormLabel>
                <TextField
                  id="keyMilestones"
                  name="keyMilestones"
                  size="small"
                  fullWidth
                  placeholder="Enter Key Milestones"
                  value={formik.values.keyMilestones}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Occupation</FormLabel>
                <TextField
                  id="occupation"
                  name="occupation"
                  size="small"
                  fullWidth
                  placeholder="Enter Occupation"
                  value={formik.values.occupation}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Interests or Hobbies</FormLabel>
                <TextField
                  id="interestsOrHobbies"
                  name="interestsOrHobbies"
                  size="small"
                  fullWidth
                  placeholder="Enter Interests or Hobbies "
                  value={formik.values.interestsOrHobbies}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={formik.values.gender} onChange={(e) => formik.setFieldValue('gender', e.target.value)}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Date of Birth</FormLabel>
                <TextField
                  id="dob"
                  name="dob"
                  size="small"
                  type="date"
                  placeholder="Enter DOB"
                  fullWidth
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Communication Frequency</FormLabel>
                <TextField
                  id="communicationFrequency"
                  name="communicationFrequency"
                  size="small"
                  fullWidth
                  placeholder="Enter Communication Frequency"
                  value={formik.values.communicationFrequency}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Preferences</FormLabel>
                <TextField
                  id="preferences"
                  name="preferences"
                  size="small"
                  fullWidth
                  placeholder="Enter Preferences"
                  value={formik.values.preferences}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>LinkedIn Profile URL</FormLabel>
                <TextField
                  id="linkedInProfile"
                  name="linkedInProfile"
                  size="small"
                  fullWidth
                  placeholder="Enter LinkedIn Profile URL"
                  value={formik.values.linkedInProfile}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Facebook Profile URl</FormLabel>
                <TextField
                  id="facebookProfile"
                  name="facebookProfile"
                  size="small"
                  placeholder="Enter Facebook Profile URL"
                  fullWidth
                  value={formik.values.facebookProfile}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Twitter Handle</FormLabel>
                <TextField
                  id="twitterHandle"
                  name="twitterHandle"
                  size="small"
                  fullWidth
                  placeholder="Enter Twitter Profile URL"
                  value={formik.values.twitterHandle}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Other Social Media Profile URL</FormLabel>
                <TextField
                  id="otherProfiles"
                  name="otherProfiles"
                  size="small"
                  fullWidth
                  value={formik.values.otherProfiles}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Assigned Agent or Team Member</FormLabel>
                <TextField
                  id="agentOrTeamMember"
                  name="agentOrTeamMember"
                  size="small"
                  fullWidth
                  placeholder="Enter Assigned Agent"
                  value={formik.values.agentOrTeamMember}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Internal Notes</FormLabel>
                <TextField
                  id="internalNotesOrComments"
                  name="internalNotesOrComments"
                  size="small"
                  multiline
                  placeholder="Enter Notes "
                  rows={4}
                  fullWidth
                  value={formik.values.internalNotesOrComments}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Add Contact
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddContact;
