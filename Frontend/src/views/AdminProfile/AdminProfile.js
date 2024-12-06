import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { getApi } from 'views/services/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import EditAdmin from './Components/EditAdmin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AdminProfile() {
  const [openEdit, setOpenEdit] = useState(false);
  const admin = JSON.parse(localStorage.getItem('user'));
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();

  const handleOpenEditAdmin = () => setOpenEdit(true);
  const handleCloseEditAdmin = () => setOpenEdit(false);

  // ----------------------------------------------------------------------
  //function for fetching admin based on the admin id

  const fetchAdminData = async () => {
    try {
      const response = await getApi(`api/user/view/${admin._id}`);
      console.log(response.data);
      setAdminData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, [openEdit]);

  return (
    <>
      <EditAdmin open={openEdit} handleClose={handleCloseEditAdmin} data={adminData} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h2">{`${adminData.firstName}  ${adminData.lastName} Information `}</Typography>
          {/* //-----------buttons-------------------- */}
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7', marginBottom: '12px' }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </Box>

        <Grid>
          <Item>
            <Typography variant="h4">View Profile</Typography>
            <hr />

            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">First Name</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.firstName}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Last Name</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.lastName}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Phone Number</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Email</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.username}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
              onClick={handleOpenEditAdmin}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
