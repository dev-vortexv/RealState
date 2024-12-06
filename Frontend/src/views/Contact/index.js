/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Popover } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import Iconify from '../../ui-component/iconify';
import AddContact from './AddContact';
import { getApi } from 'views/services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import DeleteContact from './DeleteContact';
import EditContact from './Edit';
import SendMailDialog from './Components/contactActivityDialog/sendMailDialog';
import CallDialog from './Components/contactActivityDialog/CallDialog';

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

const Contact = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSendMail, setOpenSendMail] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [propsData, setPropsData] = useState([]);
  const [contactId, setContactId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowData, setRowData] = useState();

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRowData(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // functions for opening dialog boxes--------------------------------------

  const handleOpenEditContact = () => {
    setOpenEdit(true);
  };
  const handleCloseEditlead = () => setOpenEdit(false);
  const handleOpenDeleteLead = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteLead = () => {
    setOpenDelete(false);

    handleClose();
  };
  // function for  mail dialog/////////////////////////////////////
  const handleOpenEmail = () => {
    setOpenSendMail(true);
  };
  const handleCloseEmail = () => setOpenSendMail(false);

  // function for  mail dialog/////////////////////////////////////
  const handleOpenCall = () => {
    setOpenCall(true);
  };
  const handleCloseCall = () => setOpenCall(false);
  // function for  delete dialog/////////////////////////////////////

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  // ----------------------------------------------------------------------
  const [contactData, setContactData] = useState([]);
  const [allContactData, setAllContactData] = useState([]);

  // function for fetching all the contacts data from the db

  const fetchContactsData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? 'api/contact/viewallcontacts' : `api/contact/viewusercontacts/${user._id}`);
      user.role === 'admin' ? setContactData(response.data.contactDetails) : setContactData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactsData();
  }, [openAdd, openDelete, openEdit, openSendMail, openCall]);

  //-----------------------------------------------
  const handleOpenview = () => {
    navigate(`/dashboard/contact/view/${rowData?._id}`);
  };
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/contact/view/${params.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      }
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'preferredContactMethod',
      headerName: 'Contact Method',
      flex: 1
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
                <MenuItem onClick={() => handleOpenEditContact()} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenCall()} disableRipple>
                  <CallIcon style={{ marginRight: '8px' }} />
                  Create Call
                </MenuItem>
                <MenuItem onClick={() => handleOpenEmail()} disableRipple>
                  <SendIcon style={{ marginRight: '8px' }} />
                  Send Email
                </MenuItem>
                <MenuItem onClick={() => handleOpenview()} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteLead()} sx={{ color: 'red' }} disableRipple>
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

  console.log(rowData);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddContact open={openAdd} handleClose={handleCloseAdd} />
      <DeleteContact open={openDelete} handleClose={handleCloseDeleteLead} id={rowData?._id} />
      <EditContact open={openEdit} handleClose={handleCloseEditlead} data={rowData} />
      <SendMailDialog open={openSendMail} onClose={handleCloseEmail} id={rowData?._id} recipientEmail={rowData?.email} />
      <CallDialog open={openCall} onClose={handleCloseCall} id={rowData?._id} recipientName={rowData?.firstName} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Contact-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Contact
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                Contacts ( {contactData?.length} )
              </Typography>
              <DataGrid
                rows={contactData}
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

export default Contact;
