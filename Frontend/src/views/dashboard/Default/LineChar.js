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
  const userDetail = JSON.parse(localStorage.getItem('user'));
  console.log(userDetail, 'user details');

  // Dummy data for demonstration
  const data = {
    EmailDetails: {
      Emails: [
        { date: userDetail.updatedDate, EmailCount: userDetail.emailsent },
        { date: Date(), EmailCount: userDetail.emailsent }
      ]
    },
    outboundcalls: {
      Calls: [
        { date: userDetail.updatedDate, Callcount: userDetail.outboundcall },
        { date: Date(), EmailCount: userDetail.outboundcall }
      ]
    }
  };

  useEffect(() => {
    setReportChart(data);
  }, []);

  const fetchChart = async () => {
    setReportChart(data);
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
    },
    stroke: {
      curve: 'smooth'
    }
  };

  useEffect(() => {
    fetchChart();
  }, [startDate, endDate, selection]);

  const series = Object.keys(reportChart).map((key) => {
    const dataSet = reportChart[key];
    let seriesData = [];

    // Include Email count
    if (dataSet?.Emails) {
      seriesData = seriesData.concat(dataSet.Emails.map((item) => ({ x: item.date, y: item.EmailCount, type: 'Email' })));
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
        <ApexChart options={options} series={selectedSeries} type="line" height={400} />
      </Box>
    </Card>
  );
};

export default ReportChart;
