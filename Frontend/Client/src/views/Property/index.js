import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { getApi } from 'views/services/api';
import AddProperty from './AddProperty.js';
import DeleteProperty from './DeleteProperty';
import EditProperty from './EditProperty';

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

const Property = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [propsData, setPropsData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [propertyData, setPropertyData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  //------------------------------------------------------------------------
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

  // const [allPropertyData, setAllPropertydata] = useState([]);

  // function for fetching all the contacts data from the db

  const fetchPropertiesData = async () => {
    try {
      const response = await getApi('api/property/viewallproperties');
      setPropertyData(response?.data?.properties);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPropertiesData();
  }, [openAdd, openEdit, openDelete]);

  //functions for dialog boxes----------------------------------
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEditProperty = (data) => {
    setPropsData(data);
    setOpenEdit(true);
  };
  const handleCloseEditProperty = () => setOpenEdit(false);
  const handleOpenDeleteProperty = (id) => {
    setPropertyId(id);
    setOpenDelete(true);
  };
  const handleCloseDeleteProperty = () => setOpenDelete(false);

  const handleOpenview = (propertyId) => {
    navigate(`/dashboard/property/view/${propertyId}`);
  };

  //---------------------------------------------------------------------
  let count = 0;
  const columns = [
    {
      field: 'id',
      headerName: '#',
      flex: 1,
      renderCell: (params) => {
        return <Box>{(count += 1)}</Box>;
      }
    },
    {
      field: 'propertyType',
      headerName: 'Property Type',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/property/view/${params.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      }
    },
    {
      field: 'listingPrice',
      headerName: 'Listing Price',
      flex: 1
    },
    {
      field: 'squareFootage',
      headerName: 'Square Footage',
      flex: 1
    },
    {
      field: 'yearBuilt',
      headerName: 'Year Built',
      flex: 1
    },
    {
      field: 'numberofBedrooms',
      headerName: 'Number Of Bedrooms',
      flex: 1
    },
    {
      field: 'numberofBathrooms',
      headerName: 'Number Of Bathrooms',
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
                <MenuItem onClick={() => handleOpenEditProperty(params.row)} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={() => handleOpenview(params.row._id)} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteProperty(params.row._id)} sx={{ color: 'red' }} disableRipple>
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
      <AddProperty open={openAdd} handleClose={handleCloseAdd} />
      <DeleteProperty open={openDelete} handleClose={handleCloseDeleteProperty} id={propertyId} />
      <EditProperty open={openEdit} handleClose={handleCloseEditProperty} data={propsData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Properties</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Property
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                Properties ( {propertyData.length} )
              </Typography>
              <DataGrid
                rows={propertyData}
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

export default Property;
