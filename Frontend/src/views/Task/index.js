import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddTask.js';
import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Popover } from '@mui/material';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [taskData, setTaskData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showAssignee, setShowAssignee] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [rowData, setRowData] = useState();
  const navigate = useNavigate();
  //----------------------------------------------------
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRowData(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //function for opening the dialogs-------------------
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpenDelete = () => {
    setOpenCloseDialog(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDeleteDialog = () => {
    setOpenCloseDialog(false);
    handleClose();
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenView = () => {
    navigate(`/task/view/${rowData._id}`);
  };

  // ----------------------------------------------------------------------

  // function for fetching all the tasks data from the db

  const fetchTaskData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/task/viewalltasks' : `api/task/viewusertasks/${user._id}`);
      setTaskData(response?.data?.taskData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTaskData();
  }, [openAdd, openEdit, openCloseDialog]);

  //-----------------------------------------------
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',

      renderCell: (params) => {
        const handleTitleClick = () => {
          navigate(`/task/view/${params.row._id}`);
        };

        return <Box onClick={handleTitleClick}>{params.value}</Box>;
      }
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
              <IconButton aria-describedby={params?.row._id} variant="contained" onClick={(event) => handleClick(event, params?.row)}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                id={params?.row._id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <MenuItem onClick={() => handleOpenEdit()} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={() => handleOpenView()} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDelete()} sx={{ color: 'red' }} disableRipple>
                  <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                  Delete
                </MenuItem>
              </Popover>
            </div>
          </>
        );
      }
    }
  ];

  return (
    <>
      <AddTask open={openAdd} handleClose={handleCloseAdd} />
      <EditTask open={openEdit} handleClose={handleCloseEdit} data={rowData} />
      <DeleteTask open={openCloseDialog} handleClose={handleCloseDeleteDialog} id={rowData?._id} />
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
              {taskData && (
                <>
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
                </>
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Tasks;
