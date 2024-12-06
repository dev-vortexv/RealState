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

export default function EmailDashboard() {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState([]);
  const params = useParams();
  const emailId = params.id;

  const fetchEmailData = async () => {
    try {
      const response = await getApi(`api/email/view/${emailId}`);
      setEmailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmailData();
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
              <Typography variant="h4">Email View page</Typography>
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
                <Typography style={{ color: 'black' }}>{emailData?.senderEmail ? emailData?.senderEmail : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Recipient</Typography>
                <Typography style={{ color: 'black' }}>{emailData?.recipientEmail ? emailData?.recipientEmail : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Create from</Typography>
                <Typography style={{ color: 'black' }}>
                  {emailData?.category === 'contact' ? (
                    <Typography style={{ color: 'black' }}>
                      <Link to={`/dashboard/contact/view/${emailData?.recipient}`}>{emailData?.createByName}</Link>
                    </Typography>
                  ) : (
                    <Typography style={{ color: 'black' }}>
                      <Link to={`/dashboard/lead/view/${emailData?.recipient}`}>{emailData?.createByName}</Link>
                    </Typography>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Related To</Typography>
                <Typography style={{ color: 'black' }}>{emailData?.category ? emailData?.category : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Start Date</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment(emailData.startDate).format('(MM/DD) hh:mma') ? moment(emailData.startDate).format('(MM/DD) hh:mma') : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">End Date</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment(emailData.endDate).format('(MM/DD) hh:mma') ? moment(emailData.endDate).format('(MM/DD) hh:mma') : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Timestamp</Typography>
                <Typography style={{ color: 'black' }}>
                  {moment(emailData.timestamp).fromNow() ? moment(emailData.timestamp).fromNow() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Subject</Typography>
                <Typography style={{ color: 'black' }}>{emailData?.subject ? emailData?.subject : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={12}>
                <Typography variant="h5">Message</Typography>
                <Typography style={{ color: 'black' }}>{emailData?.message ? emailData?.message : 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}
