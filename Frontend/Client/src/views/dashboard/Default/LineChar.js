import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Card from '../../../ui-component/cards/MainCard';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { postApi } from 'views/services/api';
import ApexChart from 'react-apexcharts';

const ReportChart = (props) => {
  const { dashboard } = props;
  const [reportChart, setReportChart] = useState({});
  const [startDate, setStartDate] = useState(new Date(new Date() - 14 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [select, setSelect] = useState('all');
  const [selection, setSelection] = useState('day');

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, 'user');

  const fetchChart = async () => {
    const data = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      filter: selection
    };
    let result = await postApi(user.role === 'admin' ? 'api/reporting/index' : `api/reporting/index?sender=${user._id}`, data);
    if (result && result.status === 200) {
      setReportChart(result?.data);
    }
  };

  const options = {
    chart: {
      id: 'line-chart'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    dataLabels: {
      enabled: true
    }
  };

  useEffect(() => {
    fetchChart();
  }, [startDate, endDate, selection]);

  const series = Object.keys(reportChart).map((key) => {
    const dataSet = reportChart[key][0];
    let seriesData = [];

    // Include Email count
    if (dataSet?.Emails) {
      seriesData = seriesData.concat(dataSet.Emails.map((item) => ({ x: item.date, y: item.Emailcount, type: 'Email' })));
    }

    // Include Outbound Call count
    if (dataSet?.Calls) {
      seriesData = seriesData.concat(dataSet.Calls.map((item) => ({ x: item.date, y: item.Callcount, type: 'Outbound Call' })));
    }

    return {
      name: key,
      data: seriesData
    };
  });

  const selectedSeries = select === 'all' ? series : series.filter((series) => series.name === select);

  return (
    <Card>
      {!dashboard && (
        <Box display="flex" alignItems="center" flexWrap={'wrap'} justifyContent="space-between" mb={4}>
          <Box width={{ base: '100%', md: 'auto' }} display={'flex'} justifyContent={'right'} mb={{ base: 3, md: 'auto' }}></Box>
        </Box>
      )}
      <Box id="chart" mb={4}>
        <Typography variant="h6" mb={2}>
          Report
        </Typography>
        <ApexChart options={options} series={selectedSeries} type="area" height={400} />
      </Box>
    </Card>
  );
};

export default ReportChart;
