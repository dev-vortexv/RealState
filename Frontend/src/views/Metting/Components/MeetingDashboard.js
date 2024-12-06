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
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function MeetingDashboard() {
  const [meetingData, setMeetingData] = useState([]);
  const params = useParams();
  const meetingId = params.id;
  const navigate = useNavigate();

  const fetchMeetingData = async () => {
    try {
      const response = await getApi(`api/meeting/view/${meetingId}`);
      setMeetingData(response.data);
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
              <Typography variant="h4">Meeting View page</Typography>
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
                <Typography variant="h5">Agenda</Typography>
                <Typography style={{ color: 'black' }}>{meetingData?.agenda ? meetingData?.agenda : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Created By</Typography>
                <Typography style={{ color: 'black' }}>{meetingData?.createdByName ? meetingData?.createdByName : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">DateTime</Typography>
                <Typography style={{ color: 'black' }}>{meetingData?.dateTime ? meetingData?.dateTime : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Timestamp</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment(meetingData?.timestamp).format('DD-MM-YYYY hh:mma [in] M [months]')
                    ? moment(meetingData?.timestamp).format('DD-MM-YYYY hh:mma [in] M [months]')
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Location</Typography>
                <Typography style={{ color: 'black' }}>{meetingData?.location ? meetingData?.location : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Notes</Typography>
                <Typography style={{ color: 'black' }}>{meetingData?.notes ? meetingData?.notes : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Attendes</Typography>
                {meetingData?.attendes?.length !== 0 ? (
                  meetingData?.attendes?.map((items, index) => {
                    return (
                      <Typography key={index} style={{ color: 'black' }}>
                        <Link to={`/dashboard/contact/view/${items._id}`}>{items.firstName}</Link>
                      </Typography>
                    );
                  })
                ) : (
                  <Typography style={{ color: 'black' }}>{meetingData.attendesLead ? '' : 'N/A'}</Typography>
                )}

                {/* //attendieslead--------------------------------- */}
                {meetingData?.attendesLead?.length !== 0 ? (
                  meetingData?.attendesLead?.map((items, index) => {
                    return (
                      <Typography key={index} style={{ color: 'black' }}>
                        <Link to={`/dashboard/lead/view/${items._id}`}>{items.leadName}</Link>
                      </Typography>
                    );
                  })
                ) : (
                  <Typography style={{ color: 'black' }}>{meetingData.attendes ? '' : 'N/A'}</Typography>
                )}
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}
