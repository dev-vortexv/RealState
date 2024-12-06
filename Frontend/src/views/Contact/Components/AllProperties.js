import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../../ui-component/TableStyle';
import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { getApi, patchApi } from 'views/services/api';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------

const Property = () => {
  const navigate = useNavigate();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const contactId = params.id;

  const [propertyData, setPropertyData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

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
  }, []);

  const handleCheckboxClick = (params) => {
    setSelectedRowIds([...selectedRowIds, params.row._id]);
  };

  //---------------------------------------------------------------------

  //functionn for updating the contact and add the selectable interested property to the interested property table

  const updateInterestedProperties = async () => {
    try {
      let response = await patchApi(`api/contact/updateinterestedproperty/${contactId}`, {
        interestProperty: selectedRowIds
      });
      if (response.status === 200) {
        toast.success('Porperty Added successfully');
        setSelectedRowIds([]);
        setTimeout(() => {
          navigate(`/dashboard/contact/view/${contactId}`);
        }, 500);
      } else {
        toast.error('property already exists');
        setSelectedRowIds([]);
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot add property');
      setSelectedRowIds([]);
    }
  };
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
      cellClassName: 'name-column--cell name-column--cell--capitalize'
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
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Select Interested Properties</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
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
                onCellClick={handleCheckboxClick}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
        <Button
          type="submit"
          sx={{
            marginTop: '10px',
            float: 'right'
          }}
          variant="contained"
          color="primary"
          onClick={updateInterestedProperties}
        >
          Add Interested Property
        </Button>
      </Container>
    </>
  );
};

export default Property;
