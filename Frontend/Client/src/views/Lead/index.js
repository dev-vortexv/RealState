import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
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
import { getApi } from 'views/services/api';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import AddLead from './AddLead.js';
import DeleteLead from './DeleteLead';
import EditLead from './EditLead';
import SendMailDialog from './Components/LeadActivityDialogs/sendMailDialog';
import CallDialog from './Components/LeadActivityDialogs/CallDialog';

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

const Lead = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSendMail, setOpenSendMail] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const [propsData, setPropsData] = useState([]);
  const [leadId, setLeadId] = useState(null);

  //-------------------------------------------
  const open = anchorEl;
  const handleClick = (id) => {
    // console.log('event.currentTarget', event.currentTarget);
    setAnchorEl(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownClick = (params) => {
    // console.log(params?);
    alert(params?.id);
  };

  // functions for opening the dialog boxes ---------------------------------

  // function for  mail dialog/////////////////////////////////////
  const handleOpenEmail = (id) => {
    setLeadId(id);
    setOpenSendMail(true);
  };
  const handleCloseEmail = () => setOpenSendMail(false);

  // function for  mail dialog/////////////////////////////////////
  const handleOpenCall = (id) => {
    setLeadId(id);
    setOpenCall(true);
  };
  const handleCloseCall = () => setOpenCall(false);
  // function for  delete dialog/////////////////////////////////////
  const handleOpenDeleteLead = (id) => {
    console.log(id);
    setLeadId(id);
    setOpenDelete(true);
  };
  const handleCloseDeleteLead = () => setOpenDelete(false);

  // function for add dialog/////////////////////////////////////

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEditlead = (data) => {
    setPropsData(data);
    setOpenEdit(true);
    console.log(openEdit);
  };
  const handleCloseEditlead = () => setOpenEdit(false);
  //-----------------------------------------------
  const handleOpenview = (id) => {
    navigate(`/dashboard/lead/view/${id}`);
  };

  // ----------------------------------------------------------------------

  // function for fetching all the leads data from the db

  const fetchLeadData = async () => {
    try {
      const response = await getApi('api/lead/viewallleads');
      setLeadData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeadData();
  }, [openAdd, openEdit, openDelete]);

  //---------------------
  let count = 0;
  const columns = [
    {
      field: 'id',
      headerName: '#',
      flex: 1,
      renderCell: (params?, i) => {
        return <Box>{(count += 1)}</Box>;
      }
    },
    {
      field: 'leadName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/lead/view/${params?.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params?.value}</Box>;
      }
    },
    {
      field: 'leadStatus',
      headerName: 'Status',
      flex: 1,
      cellClassName: `name-column--cell--capitalize`,
      renderCell: (params) => {
        return (
          <Box
            sx={
              params?.value?.toLowerCase() == 'active'
                ? {
                    backgroundColor: '#01B574',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
                : params?.value?.toLowerCase() == 'pending'
                ? {
                    backgroundColor: '#ECC94B',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
                : {
                    backgroundColor: '#eb7b74',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
            }
          >
            {params?.value}
          </Box>
        );
      }
    },
    {
      field: 'leadEmail',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'leadPhoneNumber',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'leadOwner',
      headerName: 'Owner',
      flex: 1
    },
    {
      field: 'leadScore',
      headerName: 'Score',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={
              params?.value >= 80
                ? {
                    color: '#01B574'
                  }
                : params?.value >= 50 && params?.value < 80
                ? {
                    color: '#01B574'
                  }
                : {
                    color: '#eb7b74'
                  }
            }
          >
            {params?.value}
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
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
                onClick={() => handleClick(params?.row._id)}
              >
                <MoreVertIcon />
              </IconButton>

              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button'
                }}
                anchorEl={anchorEl === params?.row._id}
                open={open === params?.row._id}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleOpenEditlead(params?.row)} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenCall(params?.row._id)} disableRipple>
                  <CallIcon style={{ marginRight: '8px' }} />
                  Create Call
                </MenuItem>
                <MenuItem onClick={() => handleOpenEmail(params?.row._id)} disableRipple>
                  <SendIcon style={{ marginRight: '8px' }} />
                  Send Email
                </MenuItem>
                <MenuItem onClick={() => handleOpenview(params?.row._id)} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteLead(params?.row._id)} sx={{ color: 'red' }} disableRipple>
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
      <AddLead open={openAdd} handleClose={handleCloseAdd} />
      <DeleteLead open={openDelete} handleClose={handleCloseDeleteLead} id={leadId} />
      <EditLead open={openEdit} handleClose={handleCloseEditlead} data={propsData} />
      <SendMailDialog open={openSendMail} onClose={handleCloseEmail} id={leadId} />
      <CallDialog open={openCall} onClose={handleCloseCall} id={leadId} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Lead-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Lead
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                Leads ( {leadData?.length} )
              </Typography>
              <DataGrid
                rows={leadData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row?._id}
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

export default Lead;
