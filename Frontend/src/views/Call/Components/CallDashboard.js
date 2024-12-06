import * as React from 'react';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getApi } from 'views/services/api';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function CallDashboard() {
  const navigate = useNavigate();
  const [callData, setCallData] = useState([]);
  const params = useParams();
  const callId = params.id;

  const fetchMeetingData = async () => {
    try {
      const response = await getApi(`api/phoneCall/view/${callId}`);
      setCallData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeetingData();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Grid>
          <Item>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h4">Call View page</Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Sender</Typography>
                <Typography style={{ color: 'black' }}>{callData.senderName ? callData.senderName : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Recipient</Typography>
                <Typography style={{ color: 'black' }}>{callData.recipient ? callData.recipient : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Create To</Typography>
                <Typography style={{ color: 'black' }}>{callData.createByName ? callData.createByName : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Related To</Typography>
                <Typography style={{ color: 'black' }}>{callData.category ? callData.category : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Start Date</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment.unix(callData.startDate / 1000).format('(MM/DD) hh:mma')
                    ? moment.unix(callData.startDate / 1000).format('(MM/DD) hh:mma')
                    : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">End Date</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment.unix(callData.endDate / 1000).format('(MM/DD) hh:mma')
                    ? moment.unix(callData.endDate / 1000).format('(MM/DD) hh:mma')
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Timestamp</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment(callData.timestamp).fromNow() ? moment(callData.timestamp).fromNow() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Call Duration</Typography>
                <Typography style={{ color: 'black' }}>{callData.callDuration ? callData.callDuration : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Call Notes</Typography>
                <Typography style={{ color: 'black' }}>{callData.callNotes ? callData.callNotes : 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}
