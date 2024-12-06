import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import Papa from 'papaparse';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
//import dayjs from 'dayjs';
import Actionbutton from '../../../ui-component/Actionbutton';
// import { apidelete, apiget } from '../../service/api';
import AddContact from '../AddContact';
import EditContact from '../Edit';
import DeleteModel from '../../../ui-component/Deletemodle';
// import Lead from '../../';
import Claim from '../../../ui-component/claim/Claim';
import Notes from '../../../ui-component/note/Note';
import Calls from '../../../ui-component/call/Call';
import Meetings from '../../../ui-component/meeting/Meeting';
import Emails from '../../../ui-component/email/Email';
import Task from '../../../ui-component/task/Task';
import Header from '../../../ui-component/Header';
import Overview from './Overview';
import Moreinformation from './Moreinformation';
import Other from './Other';
// import Policy from './Policy';
import { CustomTabPanel, a11yProps } from '../../../ui-component/CustomTabPanel';

const ContactView = () => {
  //   const [contactData, setContactData] = useState({});
  //   const [userAction, setUserAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [opendelete, setOpendelete] = useState(false);
  const [value, setValue] = useState(0);
  //   const [isVisibleLead, setIsVisibleLead] = useState(false);
  const [isVisibleClaim, setIsVisibleClaim] = useState(false);
  //   const [isVisiblePolicy, setIsVisiblePolicy] = useState(false);
  const [isVisibleEvent, setIsVisibleEvent] = useState(false);
  const [isVisibleNotes, setIsVisibleNotes] = useState(false);
  const [isVisibleCall, setIsVisibleCall] = useState(false);
  const [isVisibleMeetings, setIsVisibleMeetings] = useState(false);
  const [isVisibleEmail, setIsVisibleEmail] = useState(false);
  const navigate = useNavigate();
  //   const params = useParams();

  // open add model
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // open Edit model
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  // open delete model
  const handleOpenDelete = () => setOpendelete(true);
  const handleCloseDelete = () => setOpendelete(false);

  // tab
  const handleChange = (event, newValue) => setValue(newValue);

  // toggleButton
  //const toggleVisibilityLead = () => setIsVisibleLead(!isVisibleLead);
  const toggleVisibilityEvent = () => setIsVisibleEvent(!isVisibleEvent);
  const toggleVisibilityClaim = () => setIsVisibleClaim(!isVisibleClaim);
  // const toggleVisibilityPolicy = () => setIsVisiblePolicy(!isVisiblePolicy);
  const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
  const toggleVisibilityCall = () => setIsVisibleCall(!isVisibleCall);
  const toggleVisibilityMeeting = () => setIsVisibleMeetings(!isVisibleMeetings);
  const toggleVisibilityEmail = () => setIsVisibleEmail(!isVisibleEmail);

  const back = () => {
    navigate('/dashboard/contact');
  };

  // fetch api
  //   const fetchdata = async () => {
  //     const result = await apiget(`contact/view/${params.id}`);
  //     if (result && result.status === 200) {
  //       setContactData(result?.data[0]);
  //     }
  //   };
  // delete api
  //   const deletedata = async () => {
  //     await apidelete(`contact/delete/${params.id}`);
  //     navigate('/dashboard/contact');
  //   };

  //   useEffect(() => {
  //     fetchdata();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [userAction]);

  // Export data in csv file
  //   const contactCsvData = [
  //     {
  //       firstName: contactData?.firstName,
  //       lastName: contactData?.lastName,
  //       dateOfBirth: dayjs(contactData?.dateOfBirth).format('DD-MM-YYYY'),
  //       gender: contactData?.gender,
  //       phoneNumber: contactData?.phoneNumber,
  //       emailAddress: contactData?.emailAddress,
  //       address: contactData?.address,
  //       alternatePhoneNumber: contactData?.alternatePhoneNumber,
  //       additionalEmailAddress: contactData?.additionalEmailAddress,
  //       instagramProfile: contactData?.instagramProfile,
  //       twitterProfile: contactData?.twitterProfile,
  //       preferredContactMethod: contactData?.preferredContactMethod,
  //       referralSource: contactData?.referralSource,
  //       referralContactName: contactData?.referralContactName,
  //       relationshipToReferrer: contactData?.relationshipToReferrer,
  //       preferencesForMarketingCommunications: contactData?.preferencesForMarketingCommunications,
  //       preferredLanguage: contactData?.preferredLanguage,
  //       createdOn: dayjs(contactData?.createdOn).format('DD-MM-YYYY HH:mm:ss'),
  //       modifiedOn: dayjs(contactData?.modifiedOn).format('DD-MM-YYYY HH:mm:ss')
  //     }
  //   ];

  const handleExport = () => {
    const csvString = Papa.unparse(contactCsvData);
    const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = csvUrl;
    downloadLink.setAttribute('download', `${'first'} ${'lastName'} Contact_Data.csv`);
    downloadLink.click();

    // handleCloseaction();
  };

  return (
    <div>
      {/* Add Contact Model */}
      <AddContact open={open} handleClose={handleClose} />

      {/* Add Edit Model */}
      <EditContact open={openEdit} handleClose={handleCloseEdit} />

      {/* open Delete Model */}
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} />

      <Container>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
            <Header title={`${'Kavin'} ${'petter'}`} subtitle="Contact Details" />
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              {/* Action Butoon */}
              <Actionbutton
                handleOpen={handleOpen}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
                handleExport={handleExport}
                back={back}
              />
            </Stack>
          </Stack>
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '0px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="OVERVIEW" {...a11yProps(0)} />
              <Tab label="MORE INFORMATION" {...a11yProps(1)} />
              <Tab label="OTHER" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Overview />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Moreinformation />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Other />
          </CustomTabPanel>
        </Box>

        {/* Policy Table */}
        {/* <Card sx={{ marginTop: '50px' }}>
          <Policy toggleVisibilityPolicy={toggleVisibilityPolicy} isVisiblePolicy={isVisiblePolicy} />
        </Card> */}

        {/* Claim Table */}
        <Card sx={{ marginTop: '20px' }}>
          <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} />
        </Card>

        {/* Lead Table */}
        {/* <Card sx={{ marginTop: '20px' }}>
          <Lead toggleVisibilityLead={toggleVisibilityLead} isVisibleLead={isVisibleLead} />
        </Card> */}

        {/* Notes Table */}
        <Card sx={{ marginTop: '50px' }}>
          <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} />
        </Card>

        {/* Task Table */}
        <Card sx={{ marginTop: '20px' }}>
          <Task toggleVisibilityTask={toggleVisibilityEvent} isVisibleTask={isVisibleEvent} />
        </Card>

        {/* Meetings Table */}
        <Card sx={{ marginTop: '20px' }}>
          <Meetings toggleVisibilityMeeting={toggleVisibilityMeeting} isVisibleMeetings={isVisibleMeetings} />
        </Card>

        {/* Calls Table */}
        <Card sx={{ marginTop: '20px' }}>
          <Calls toggleVisibilityCall={toggleVisibilityCall} isVisibleCall={isVisibleCall} />
        </Card>

        {/* Emails Table */}
        <Card sx={{ marginTop: '20px' }}>
          <Emails toggleVisibilityEmail={toggleVisibilityEmail} isVisibleEmail={isVisibleEmail} />
        </Card>
      </Container>
    </div>
  );
};

export default ContactView;
