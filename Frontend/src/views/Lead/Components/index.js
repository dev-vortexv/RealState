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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import EditLead from '../EditLead';
import EmailGrid from './LeadActivity';
import { getApi } from 'views/services/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import AddLead from '../AddLead';
import DeleteLead from '../DeleteLead';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import moment from 'moment';
import DocumentSection from './DocumentSection';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function LeadDashboard() {
  const params = useParams();
  const leadId = params.id;
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentData, setDocumentData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

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
  const [leadData, setLeadData] = useState([]);
  const [allData, setAllData] = useState([]);

  const fetchLeadData = async () => {
    try {
      const response = await getApi(`api/lead/view/${leadId}`);
      setLeadData(response?.data?.lead);
      setAllData(response.data);
      setDocumentData(response?.data?.Document);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeadData();
  }, [openAdd, deleteDialogOpen, openEdit]);

  return (
    <>
      <DeleteLead open={deleteDialogOpen} handleClose={handleCloseDeleteLead} />
      <AddLead open={openAdd} handleClose={handleCloseAdd} />
      <EditLead open={openEdit} handleClose={handleCloseEditlead} data={leadData} />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
              <Tab label="Information" value="1" />
              <Tab label="Activity" value="2" />
              {user.role === 'admin' ? <Tab label="Document" value="3" /> : ''}
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
          <TabPanel value="1">
            <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Basic Lead Information
                    </Typography>
                    <hr />

                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Name:</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadName ? leadData.leadName : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Email:</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadEmail ? leadData.leadEmail : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Phone Number:</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadPhoneNumber ? leadData.leadPhoneNumber : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Address:</Typography>
                        <Typography style={{ color: 'black' }}> {leadData.leadAddress ? leadData.leadAddress : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Lead Dates and Follow-up
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead FollowUp Status:</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadStatus ? leadData.leadFollowUpStatus : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Creation Date:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {moment(leadData.leadCreationDate).format('MMMM DD, YYYY')
                            ? moment(leadData.leadCreationDate).format('MMMM DD, YYYY')
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lea Conversion Date:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {moment(leadData.leadConversionDate).format('MMMM DD, YYYY')
                            ? moment(leadData.leadConversionDate).format('MMMM DD, YYYY')
                            : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead FollowUp Date:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {moment(leadData.leadFollowUpDate).format('MMMM DD, YYYY')
                            ? moment(leadData.leadFollowUpDate).format('MMMM DD, YYYY')
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: '10px', overflowX: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Item>
                    <Typography variant="h5" fontWeight="bold">
                      Lead Source and Details
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source:</Typography>
                        <Typography style={{ color: 'black' }}> {leadData.leadSource ? leadData.leadSource : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Status:</Typography>
                        <Typography style={{ color: 'black' }}> {leadData.leadStatus ? leadData.leadStatus : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source Details:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadSourceDetails ? leadData.leadSourceDetails : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Campaign:</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadCampaign ? leadData.leadCampaign : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source Channel:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadSourceChannel ? leadData.leadSourceChannel : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5"> Lead Source Medium :</Typography>
                        <Typography style={{ color: 'black' }}>{leadData.leadSourceMedium ? leadData.leadSourceMedium : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source Campaign:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadSourceCampaign ? leadData.leadSourceCampaign : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Lead Source Referral :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadSourceReferral ? leadData.leadSourceReferral : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    <Typography variant="h5" fontWeight="bold">
                      Lead Assignment and Ownership
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Owner:</Typography>
                        <Typography style={{ color: 'black', marginTop: '3px' }}>
                          {leadData.leadOwner ? leadData.leadOwner : 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Assigned Agent:</Typography>
                        <Typography style={{ color: 'black', marginTop: '3px' }}>
                          {leadData.leadAssignedAgent ? leadData.leadAssignedAgent : 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={12}>
                        <Typography variant="h5"> Lead Communication Preferences:</Typography>
                        <Typography style={{ color: 'black', marginTop: '3px' }}>
                          {leadData.leadCommunicationPreferences ? leadData.leadCommunicationPreferences : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    <Typography variant="h5" fontWeight="bold">
                      Lead Scoring and Nurturing
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Score:</Typography>
                        <Typography style={{ color: 'black' }}>
                          <Typography style={{ color: 'black' }}> {leadData.leadScore ? leadData.leadScore : 'N/A'}</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Nurturing Workflow:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadNurturingWorkflow ? leadData.leadNurturingWorkflow : 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Engagement Level:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadEngagementLevel ? leadData.leadEngagementLevel : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Conversion Rate:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadConversionRate ? leadData.leadConversionRate : 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Nurturing Stage:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {leadData.leadNurturingStage ? leadData.leadNurturingStage : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Lead Next Action:</Typography>
                        <Typography style={{ color: 'black' }}> {leadData.leadNextAction ? leadData.leadNextAction : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* //ACTIVITY SECTION ------------------------------------------------------------------ */}
          <TabPanel value="2">
            <EmailGrid data={allData} />
          </TabPanel>
          {/* DOCUMENTS SECTION------------------------------------------------------------------------- */}
          <TabPanel value="3">
            <DocumentSection item={documentData} isFolder={true} />
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
