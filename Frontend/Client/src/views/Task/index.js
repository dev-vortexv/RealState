import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddTask.js';
import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import AddProperty from './AddTask.js';
import AddTask from './AddTask.js';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

// ----------------------------------------------------------------------

// const taskData = [
//   {
//     id: 1,
//     title: 'meeting',
//     related: 'None',
//     assignmentTo: 'Ms Ransom Goolding',
//     startDate: '2023-08-25',
//     endDate: '2023-08-25'
//   },
//   {
//     id: 2,
//     title: 'party',
//     related: 'contact',
//     assignmentTo: '	Rev Ambrosio Barry',
//     startDate: '	2023-09-20',
//     endDate: '2023-09-20'
//   },
//   {
//     id: 3,
//     title: 'abc',
//     related: 'contact',
//     assignmentTo: '-',
//     startDate: '2023-09-06',
//     endDate: '2023-09-13'
//   }
// ];

const Tasks = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [propsData, setPropsData] = useState([]);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [taskData, setTaskData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showAssignee, setShowAssignee] = useState(null);

  ///---------------------------------------------------------------
  const open = anchorEl;
  const handleClick = (id) => {
    // console.log('event.currentTarget', event.currentTarget);
    setAnchorEl(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownClick = (params) => {
    console.log(params);
    alert(params.id);
  };

  //function for opening the dialogs-------------------
  const handleOpenEdit = (taskData) => {
    setPropsData(taskData);
    setOpenEdit(true);
  };
  const handleOpenDelete = (taskId) => {
    setTaskId(taskId);
    setOpenCloseDialog(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDeleteDialog = () => setOpenCloseDialog(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenView = (taskId) => {
    navigate(`/task/view/${taskId}`);
  };

  // ----------------------------------------------------------------------

  // function for fetching all the tasks data from the db

  const fetchTaskData = async () => {
    try {
      const response = await getApi('api/task/viewalltasks');
      setTaskData(response?.data?.taskData);
      // setAllTasks(response.data.contactDetails);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTaskData();
  }, [openAdd, openEdit, openCloseDialog]);

  let count = 0;
  //-----------------------------------------------
  const columns = [
    {
      field: 'id',
      headerName: '#',
      flex: 1,
      renderCell: (params) => {
        return <Box> {(count += 1)}</Box>;
      }
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'category',
      headerName: 'Related',
      flex: 1
    },
    {
      field: 'assignmentToName',
      headerName: 'Assignment To',
      flex: 1
    },
    {
      field: 'start',
      headerName: 'Start Date',
      flex: 1
    },
    {
      field: 'end',
      headerName: 'End Date',
      flex: 1
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,

      renderCell: (params) => {
        return (
          <>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={() => handleClick(params.row._id)}
              >
                <MoreVertIcon />
              </IconButton>

              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button'
                }}
                anchorEl={anchorEl === params.row._id}
                open={open === params.row._id}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleOpenEdit(params.row)} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenView(params.row._id)} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDelete(params.row._id)} sx={{ color: 'red' }} disableRipple>
                  <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                  Delete
                </MenuItem>
              </StyledMenu>
            </div>
          </>
        );
      }
    }
  ];

  return (
    <>
      <AddTask open={openAdd} handleClose={handleCloseAdd} />
      <EditTask open={openEdit} handleClose={handleCloseEdit} data={propsData} />
      <DeleteTask open={openCloseDialog} handleClose={handleCloseDeleteDialog} id={taskId} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Tasks</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Task
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                Tasks ( {taskData?.length} )
              </Typography>
              <DataGrid
                rows={taskData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Tasks;
