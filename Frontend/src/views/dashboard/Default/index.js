import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import TotalContactCard from './TotalContactCard';
import PopularCard from './PopularCard';
import TotalLeadsCard from './TotalLeadsCard';
import TotalPropertiesCard from './TotalPropertiesCard';
import TotalTaskCard from './TotalTaskCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

import { getApi } from 'views/services/api';
import BasicLineChart from './LineChar';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [contactData, setContactData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [meetingData, setMeetingData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [callData, setCallData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchContactsData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/contact/viewallcontacts' : `api/contact/viewusercontacts/${user._id}`);
      user.role === 'admin' ? setContactData(response.data.contactDetails) : setContactData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeadData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/lead/viewallleads' : `api/lead/viewuserleads/${user._id}`);
      setLeadData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropertyData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? `api/property/viewallproperties` : `api/property/viewuserproperty/${user._id}`);
      setPropertyData(response?.data?.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaskData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/task/viewalltasks' : `api/task/viewusertasks/${user._id}`);
      setTaskData(response?.data?.taskData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMeetingData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/meeting/viewallmeetings' : `api/meeting/viewusermeetings/${user._id}`);
      setMeetingData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCallData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/phoneCall/viewallcalls' : `api/phoneCall/viewusercalls/${user._id}`);
      setCallData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmailData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/email/viewallemails' : `api/email/viewuseremails/${user._id}`);
      setEmailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactsData(), fetchLeadData(), fetchPropertyData(), fetchTaskData(), fetchMeetingData(), fetchCallData(), fetchEmailData();
  }, []);

  // console.log(contactData, 'nnnnnnnnnn');
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalLeadsCard isLoading={isLoading} leadData={leadData} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalContactCard isLoading={isLoading} contactData={contactData} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalPropertiesCard isLoading={isLoading} propertyData={propertyData} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalTaskCard isLoading={isLoading} taskData={taskData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <BasicLineChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TotalGrowthBarChart
              isLoading={isLoading}
              propertyData={propertyData}
              taskData={taskData}
              contactData={contactData}
              leadData={leadData}
              emailData={emailData}
              callData={callData}
              meetingData={meetingData}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
