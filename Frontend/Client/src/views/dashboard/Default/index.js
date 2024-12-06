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
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
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

  const fetchContactsData = async () => {
    try {
      const response = await getApi('api/contact/viewallcontacts');
      setContactData(response.data.contactDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeadData = async () => {
    try {
      const response = await getApi('api/lead/viewallleads');
      setLeadData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropertyData = async () => {
    try {
      const response = await getApi(`api/property/viewallproperties`);
      setPropertyData(response?.data?.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaskData = async () => {
    try {
      const response = await getApi('api/task/viewalltasks');
      setTaskData(response?.data?.taskData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactsData(), fetchLeadData(), fetchPropertyData(), fetchTaskData();
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
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
