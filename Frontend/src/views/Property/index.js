import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Popover, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { getApi, postApi } from 'views/services/api';
import AddProperty from './AddProperty.js';
import DeleteProperty from './DeleteProperty';
import EditProperty from './EditProperty';
import { XMLParser } from 'fast-xml-parser';
import { toast } from 'react-toastify';
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
  const [openDelete, setOpenDelete] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [rowData, setRowData] = useState();

  const navigate = useNavigate();

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRowData(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // XML Upload Dialog state and handler
  const [openXMLDialog, setOpenXMLDialog] = useState(false);
  const [xmlFile, setXmlFile] = useState(null);

  const handleOpenXMLDialog = () => setOpenXMLDialog(true);
  const handleCloseXMLDialog = () => setOpenXMLDialog(false);

  const handleFileChange = (event) => {
    setXmlFile(event.target.files[0]);
  };

  const handleImportXML = async () => {
    if (xmlFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const xmlData = event.target.result;
        const parser = new XMLParser();
        let xmlObj = parser.parse(xmlData);
        console.log(xmlObj);

        const AddData = async (values) => {
          try {

            values.createBy = JSON.parse(localStorage.getItem('user'))._id;
            console.log(values)
            let response = await postApi('api/property/addMany', values);
            console.log(response)
            if (response.status === 200) {
              toast.success('Property Added successfully');
              await fetchPropertyData()
              setOpenXMLDialog(false)
            } else {
              toast.error('cannot add property');
            }
          } catch (e) {
            console.log(e);
            toast.error('cannot add property');
          }
        };

        let ppp = {
          "propertyType": "Residential",
          "propertyAddress": "123 Maple Street, Springfield, IL",
          "listingPrice": "350000",
          "squareFootage": "2500",
          "numberofBedrooms": 4,
          "numberofBathrooms": 3,
          "yearBuilt": 1995,
          "propertyDescription": "Spacious 4-bedroom home with modern amenities and a large backyard.",
          "lotSize": "0.5 acres",
          "parkingAvailability": "Garage",
          "appliancesIncluded": "Refrigerator, Dishwasher, Oven",
          "heatingAndCoolingSystems": "Central Heating, Central Cooling",
          "flooringType": "Hardwood",
          "exteriorFeatures": "Brick, Patio",
          "communityAmenities": "Swimming Pool, Clubhouse",
          "propertyPhotos": [
            "photo1.jpg",
            "photo2.jpg"
          ],
          "virtualToursOrVideos": [
            "tour1.mp4"
          ],
          "floorPlans": [
            "floorplan1.pdf"
          ],
          "propertyDocuments": [
            "document1.pdf"
          ],
          "listingStatus": "Active",
          "listingAgentOrTeam": "Jane Doe Realty",
          "listingDate": "2024-07-29",
          "marketingDescription": "Beautiful home with modern finishes and great community amenities.",
          "multipleListingService": "MLS12345",
          "previousOwners": 2,
          "purchaseHistory": "Purchased in 2010 for $250,000",
          "propertyTaxes": "3000 per year",
          "homeownersAssociation": "250 per year",
          "mortgageInformation": "30-year fixed, 3.5% interest rate",
          "sellers": "John Smith",
          "buyers": "Alice Johnson",
          "photo": "agentphoto.jpg",
          "propertyManagers": "XYZ Property Management",
          "contractorsOrServiceProviders": "ABC Home Services",
          "internalNotesOrComments": "Need to schedule a property inspection.",
          "deleted": false,
          "updatedDate": "2024-07-29T12:00:00Z",
          "createdDate": "2024-07-29T12:00:00Z",
          "createBy": "60c72b2f5f1b2c001f6473f0"
        }

        

        let savedData = await AddData(ppp);

        console.log(savedData);
      };
      reader.readAsText(xmlFile);
    }
  };

  // function for fetching all the contacts data from the db
  const fetchPropertyData = async () => {
    try {
      const response = await getApi(user.role === 'admin' ? `api/property/viewallproperties` : `api/property/viewuserproperty/${user._id}`);
      setPropertyData(response?.data?.properties);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [openAdd, openEdit, openDelete]);

  // functions for dialog boxes
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEditProperty = () => {
    setOpenEdit(true);
  };
  const handleCloseEditProperty = () => setOpenEdit(false);
  const handleOpenDeleteProperty = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteProperty = () => {
    setOpenDelete(false);
    handleClose();
  };

  const handleOpenview = () => {
    navigate(`/dashboard/property/view/${rowData._id}`);
  };

  let count = 0;
  const columns = [
    {
      field: '_id',
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
                <MenuItem onClick={() => handleOpenEditProperty()} disableRipple>
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenview()} disableRipple>
                  <VisibilityIcon style={{ marginRight: '8px', color: 'green' }} />
                  View
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteProperty()} sx={{ color: 'red' }} disableRipple>
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
      <AddProperty open={openAdd} handleClose={handleCloseAdd} />
      <DeleteProperty open={openDelete} handleClose={handleCloseDeleteProperty} id={rowData?._id} />
      <EditProperty open={openEdit} handleClose={handleCloseEditProperty} data={rowData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Properties</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenXMLDialog}>
              Import XML
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Property
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                Properties ({propertyData?.length})
              </Typography>
              <DataGrid
                rows={propertyData}
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
      <Dialog open={openXMLDialog} onClose={handleCloseXMLDialog}>
        <DialogTitle>Import XML</DialogTitle>
        <DialogContent>
          <input type="file" accept=".xml" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseXMLDialog}>Cancel</Button>
          <Button onClick={handleImportXML} disabled={!xmlFile}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Property;
