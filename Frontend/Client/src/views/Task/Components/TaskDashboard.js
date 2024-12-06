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
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from 'react-router';
import AddTask from '../AddTask';
import DeleteTask from '../DeleteTask';
import EditTask from '../EditTask';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function TaskDashboard() {
  const navigate = useNavigate();
  const params = useParams();
  const taskId = params.id;
  const [taskData, setTaskData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [value, setValue] = React.useState('1');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEditlead = () => setOpenEdit(true);
  const handleCloseEditlead = () => setOpenEdit(false);
  const handleOpenDeleteLead = () => setDeleteDialogOpen(true);
  const handleCloseDeleteLead = () => setDeleteDialogOpen(false);

  //function for fetching Tasks based on the task id

  // ----------------------------------------------------------------------

  const fetchContactData = async () => {
    try {
      const response = await getApi(`api/task/view/${taskId}`);
      setTaskData(response.data);
      // setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContactData();
  }, [openAdd, openEdit, deleteDialogOpen]);

  return (
    <>
      <DeleteTask open={deleteDialogOpen} handleClose={handleCloseDeleteLead} />
      <AddTask open={openAdd} handleClose={handleCloseAdd} />
      <EditTask open={openEdit} handleClose={handleCloseEditlead} data={taskData} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h2">Task View</Typography>
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

        <Grid>
          <Item>
            <Typography variant="h4">View Task</Typography>
            <hr />

            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Task Title</Typography>
                <Typography style={{ color: 'black' }}>{taskData.title ? taskData.title : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Task Related To</Typography>
                <Typography style={{ color: 'black' }}>{taskData.category ? taskData.category : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Task start</Typography>
                <Typography style={{ color: 'black' }}>{taskData.start ? taskData.start : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Task end</Typography>
                <Typography style={{ color: 'black' }}>{taskData.end ? taskData.end : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Task Link</Typography>
                <Typography style={{ color: 'black' }}>
                  <Link to="https://www.facebook.com">{taskData.url ? taskData.url : 'N/A'}</Link>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Create By</Typography>
                <Typography style={{ color: 'black' }}>{taskData.createByName ? taskData.createByName : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={12}>
                <Typography variant="h5">Assignment To</Typography>
                <Typography style={{ color: 'black' }}>{taskData.assignmentToName ? taskData.assignmentToName : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={12}>
                <Typography variant="h5">Task Description</Typography>
                <Typography style={{ color: 'black' }}>{taskData.description ? taskData.description : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={12}>
                <Typography variant="h5">Task Notes</Typography>
                <Typography style={{ color: 'black' }}>{taskData.notes ? taskData.notes : 'N/A'}</Typography>
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
              onClick={handleOpenEditlead}
            >
              Edit
            </Button>
            <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={handleOpenDeleteLead}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
