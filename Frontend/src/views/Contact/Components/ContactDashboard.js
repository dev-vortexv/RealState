import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApi } from 'views/services/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import ContactActivity from './ContactActivity';
import MenuItem from '@mui/material/MenuItem';
import DeleteContact from '../DeleteContact';
import EditContact from '../Edit';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';

import { useNavigate, useParams } from 'react-router';
import { height } from '@mui/system';
import SocialMedia from './SocialMedia';
import AddContact from '../AddContact';
import InterestedProperty from './InterestedProperty';
import DocumentSection from './DocumentSection';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ContactDashboard() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEditlead = () => setOpenEdit(true);
  const handleCloseEditlead = () => setOpenEdit(false);
  const handleOpenDeleteLead = () => setDeleteDialogOpen(true);
  const handleCloseDeleteLead = () => setDeleteDialogOpen(false);

  //function for fetching leads based on the lead id

  // ----------------------------------------------------------------------
  const [contactData, setContactData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [totalInterestedProperties, setTotalInterestedProperty] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const params = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const contactId = params.id;

  const fetchContactData = async () => {
    try {
      const response = await getApi(`api/contact/view/${contactId}`);
      setDocumentData(response?.data?.Document);
      setContactData(response.data.contact);
      setAllData(response.data);
      setTotalInterestedProperty(response.data.interestProperty.interestProperty);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactData();
  }, [openAdd, openEdit, deleteDialogOpen]);

  return (
    <>
      <DeleteContact open={deleteDialogOpen} handleClose={handleCloseDeleteLead} />
      <AddContact open={openAdd} handleClose={handleCloseAdd} />
      <EditContact open={openEdit} handleClose={handleCloseEditlead} data={contactData} />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
              <Tab label="Information" value="1" />
              <Tab label="Activity" value="2" />
              {user.role === 'admin' ? <Tab label="Document" value="3" /> : ''}
              <Tab label="Social Media" value="4" />
            </TabList>

            {/* //-----------buttons-------------------- */}
            <div>
              <Select value={selectedOption} displayEmpty inputProps={{ 'aria-label': 'Select option' }} sx={{ marginBottom: '12px' }}>
                <MenuItem value="" disabled>
                  Action
                </MenuItem>
                <MenuItem onClick={handleOpenAdd} sx={{ color: '#4CAF50' }}>
                  <AddIcon sx={{ marginRight: 1 }} />
                  Add
                </MenuItem>
                <MenuItem onClick={handleOpenEditlead} sx={{ color: '#2196F3' }}>
                  <EditIcon sx={{ marginRight: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteLead} sx={{ color: '#FF0000' }}>
                  <DeleteIcon sx={{ marginRight: 1 }} />
                  Delete
                </MenuItem>
              </Select>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </Box>
          {/* //INFORMATION SECTION ------------------------------------------------------------------ */}
          <TabPanel value="1">
            <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Basic Contact Information
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">First Name :</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.firstName ? contactData.firstName : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Last Name :</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.lastName ? contactData.lastName : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Title :</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.title ? contactData.title : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Phone Number:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.phoneNumber ? contactData.phoneNumber : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Mobile Number:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.mobileNumber ? contactData.mobileNumber : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Email Address:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.email ? contactData.email : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Physical Address :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.physicalAddress ? contactData.physicalAddress : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Mailing Address :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.mailingAddress ? contactData.mailingAddress : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Preferred Contact Method :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.preferredContactMethod ? contactData.preferredContactMethod : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item sx={{ height: '70%' }}>
                    <Typography variant="h4" fontWeight="bold">
                      Lead Source Information
                    </Typography>
                    <hr />
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source :</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.leadSource ? contactData.leadSource : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Referral Source:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.referralSource ? contactData.referralSource : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'stretch', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Campaing Source:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.campaignSource ? contactData.campaignSource : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                  {/* //--------------------------------------Tags or Categories-------------------------------------- */}
                  <Grid container spacing={2} sx={{ marginTop: '2px' }}>
                    <Grid item xs={12} md={12}>
                      <Item sx={{ height: '100%' }}>
                        <Typography variant="h4" fontWeight="bold">
                          Tags or Categories
                        </Typography>
                        <hr />
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={12}>
                            <Typography variant="h5">Tags Or Labels For Categorizing Contacts :</Typography>
                            <Typography style={{ color: 'black' }}>
                              {contactData.tagsOrLabelsForcategorizingcontacts ? contactData.tagsOrLabelsForcategorizingcontacts : 'N/A'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                  {/* //Tags or Categories end here ---------------------------------------------------------------- */}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item sx={{ height: '50%' }}>
                    <Typography variant="h4" fontWeight="bold">
                      Status and Classifications
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Status:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.leadStatus ? contactData.leadStatus : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Rating:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.leadRating ? contactData.leadRating : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Conversion Probability:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.leadConversionProbability ? contactData.leadConversionProbability : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                  {/* //--------------------------------------Important Dates-------------------------------------- */}
                  <Grid container spacing={2} sx={{ marginTop: '2px' }}>
                    <Grid item xs={12} md={12}>
                      <Item>
                        <Typography variant="h4" fontWeight="bold">
                          Important Dates
                        </Typography>
                        <hr />
                        <Grid
                          container
                          spacing={2}
                          sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px', height: '100%' }}
                        >
                          <Grid item xs={6} md={5}>
                            <Typography variant="h5">Birthday :</Typography>
                            <Typography style={{ color: 'black' }}>
                              {moment(contactData.birthday).format('MMMM DD, YYYY')
                                ? moment(contactData.birthday).format('MMMM DD, YYYY')
                                : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={7}>
                            <Typography variant="h5">Anniversary :</Typography>
                            <Typography style={{ color: 'black' }}>
                              {moment(contactData.anniversary).format('MMMM DD, YYYY')
                                ? moment(contactData.anniversary).format('MMMM DD, YYYY')
                                : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={12}>
                            <Typography variant="h5">Key Milestones :</Typography>
                            <Typography style={{ color: 'black' }}>
                              {contactData.keyMilestones ? contactData.keyMilestones : 'N/A'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                  {/* Important Dates end here ---------------------------------------------------------------- */}
                </Grid>
                {/* Additional Personal Information---------------------------- */}
                <Grid item xs={12} md={4}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Additional Personal Information
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Date Of Birth :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {moment(contactData.dob).format('MMMM DD, YYYY') ? moment(contactData.dob).format('MMMM DD, YYYY') : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Gender :</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.gender ? contactData.gender : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Occupation:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.occupation ? contactData.occupation : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Interests Or Hobbies:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.interestsOrHobbies ? contactData.interestsOrHobbies : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/*Lead Assignment and Team Collaboration ---------------------------- */}
                <Grid item xs={12} md={4}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Lead Assignment and Team Collaboration
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Agent Or TeamMember:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.agentOrTeamMember ? contactData.agentOrTeamMember : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">InternalNotes Or Comments :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.internalNotesOrComments ? contactData.internalNotesOrComments : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/*Lead Assignment and Team Collaboration ---------------------------- */}
                <Grid item xs={12} md={4}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Preferred Communication Preferences
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Communication Frequency:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {contactData.communicationFrequency ? contactData.communicationFrequency : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Preferences:</Typography>
                        <Typography style={{ color: 'black' }}>{contactData.preferences ? contactData.preferences : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/* --------------------------------------------------Property of Interest ---------------------------- */}
                <Grid item xs={12} md={12}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Property of Interest
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <InterestedProperty data={totalInterestedProperties} />
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* //ACTIVITY SECTION ------------------------------------------------------------------ */}
          <TabPanel value="2">
            <ContactActivity data={allData} />
          </TabPanel>
          {/* DOCUMENTS SECTION------------------------------------------------------------------------- */}
          <TabPanel value="3">
            <DocumentSection item={documentData} isFolder={true} />
          </TabPanel>
          <TabPanel value="4">
            <SocialMedia data={contactData} />
          </TabPanel>
        </TabContext>
        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
            onClick={handleOpenEditlead}
          >
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={handleOpenDeleteLead}>
            Delete
          </Button>
        </Grid>
      </Box>
    </>
  );
}
